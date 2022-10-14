import {Client as WebsocketClient} from 'rpc-websockets'
import fetch from 'node-fetch'
import cli from 'cli-ux'
import type {IWSRequestParams} from 'rpc-websockets/dist/lib/client'

type WebsocketOptions = {
  mask?: boolean;
  binary?: boolean;
  compress?: boolean;
  fin?: boolean;
}

export type RpcResponse<R> = {
  data: R;
  metadata?: Record<string, unknown> | null;
}

function asRpcResponse<R>(response: RpcResponse<R> | R): RpcResponse<R> {
  if (response && typeof response === 'object' && 'data' in response && 'metadata' in response) return response
  // convert legacy responses of old albatross clients before nimiq/core-rs-albatross#1023 into the new response format
  return {
    data: response as R,
    metadata: null,
  }
}

export class Socket extends WebsocketClient {
  public async call(method: string, params?: IWSRequestParams, timeout?: number, ws_opts?: WebsocketOptions):
    Promise<RpcResponse<unknown>> {
    // Show loading spinner if no result after 1s
    const loaderTimeout = setTimeout(() => cli.action.start('Loading'), 1000)

    return super
    .call(method, params || [], timeout, ws_opts)
    .then(result => {
      cli.action.stop()
      return asRpcResponse(result)
    })
    .catch(error => {
      if (error.data) throw new Error(`${error.message}: ${error.data}`)
      else throw error
    })
    .finally(() => {
      clearTimeout(loaderTimeout)
    })
  }

  public onSubscription<R>(
    event: string,
    subscriptionId: number,
    listener: (message: RpcResponse<R>) => void,
    context?: any,
  ): this {
    return super.on(event, (message: unknown) => {
      if (typeof message !== 'object' || !message || typeof (message as any).subscription !== 'number' ||
        !('result' in message)) {
        throw new Error(`Unexpected format of subscription message ${JSON.stringify(message)}`)
      }
      const {result, subscription} = message as {result: RpcResponse<R> | R; subscription: number}
      if (subscription !== subscriptionId) return
      listener(asRpcResponse(result))
    }, context)
  }
}

export class Request {
  private count = 0

  constructor(
    private url: string,
    private auth?: string,
  ) {}

  public async call(method: string, params?: IWSRequestParams, _timeout?: number): Promise<RpcResponse<unknown>> {
    return fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.auth ? {Authorization: this.auth} : {}),
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method,
        params: params || [],
        id: this.count++,
      }),
    })
    .then(response => {
      if (!response.ok) {
        if (response.status === 401) { // Unauthorized
          throw new Error('Server requires authorization. Use the --auth argument to set username and password.')
        }

        throw new Error(`Response status code not OK: ${response.status} ${response.statusText}`)
      }
      return response.json()
    })
    .then(data => {
      if (data.result) return asRpcResponse(data.result)
      if (data.error) throw new Error(`${data.error.message}: ${data.error.data}`)
      throw new Error(`Unexpected format of data ${JSON.stringify(data)}`)
    })
  }
}

export default class Rpc {
    private static connection: Socket | Request | undefined

    private static url: URL

    public static async init(url: URL, type: 'request', auth?: string): Promise<Request>

    public static async init(url: URL, type: 'socket', auth?: string): Promise<Socket>

    public static async init(url: URL, type: 'request' | 'socket', auth?: string) {
      this.url = url

      if (type === 'request') {
        this.connection = new Request(url.href, auth)
        return this.connection
      }

      return new Promise((resolve, reject) => {
        const connection = new Socket(url.href, {
          max_reconnects: 0, // no limit
          ...(auth ? {headers: {Authorization: auth}} : {}),
        })

        connection.on('open', () => {
          this.connection = connection
          resolve(this.connection)
        })

        connection.on('error', (error: Error) => {
          if (error.message.includes('401')) { // Unauthorized
            reject(new Error('Server requires authorization. Use the --auth argument to set username and password.'))
            return
          }

          reject(error)
        })
      })
    }

    public static getClient(): Socket | Request {
      if (!this.connection) throw new Error('Not initialized, call init(<url>) first!')
      return this.connection
    }

    public static getUrl(): URL {
      return this.url
    }
}

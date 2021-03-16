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

export class Socket extends WebsocketClient {
  public async call(method: string, params?: IWSRequestParams, timeout?: number, ws_opts?: WebsocketOptions): Promise<unknown> {
    // TODO: Remove when RPC server accepts numbers for the block height
    if (method === 'blockByNumber' && params && typeof params[0] === 'number') params[0] = params[0].toString()

    // Show loading spinner if no result after 1s
    const loaderTimeout = setTimeout(() => cli.action.start('Loading'), 1000)

    return super
    .call(method, params || [], timeout || 5000, ws_opts)
    .then(result => {
      cli.action.stop()
      return result
    })
    .catch(error => {
      if (error.data) throw new Error(`${error.message}: ${error.data}`)
      else throw error
    })
    .finally(() => {
      clearTimeout(loaderTimeout)
    })
  }
}

export class Request {
  private count = 0

  constructor(private url: string) {}

  public async call(method: string, params?: IWSRequestParams | undefined): Promise<unknown> {
    return fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method,
        params: params || [],
        id: this.count++,
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.result) return data.result
      if (data.error) throw new Error(`${data.error.message}: ${data.error.data}`)
    })
  }
}

export default class Rpc {
    private static connection: Socket | Request | undefined

    private static url: URL

    public static async init(url: URL, type: 'request'): Promise<Request>

    public static async init(url: URL, type: 'socket'): Promise<Socket>

    public static async init(url: URL, type: 'request' | 'socket') {
      this.url = url

      if (type === 'request') {
        this.connection = new Request(url.href)
        return this.connection
      }

      return new Promise((resolve, reject) => {
        const connection = new Socket(url.href, {
          max_reconnects: 0, // no limit
        })

        connection.on('open', () => {
          this.connection = connection
          resolve(this.connection)
        })

        connection.on('error', (error: Error) => reject(error))
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

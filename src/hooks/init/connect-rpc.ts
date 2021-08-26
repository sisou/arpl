import {Hook} from '@oclif/config'
import minimist from 'minimist'

import Rpc from '../../lib/rpc'

const btoa = (b: string) => Buffer.from(b).toString('base64')

const hook: Hook<'init'> = async function (opts) {
  this.debug('INIT HOOK')

  const args = minimist(opts.argv)
  let url: URL
  if (args.url || args.u) {
    url = new URL(args.url || args.u)
  } else {
    const host = `${args.host || args.h || 'localhost'}:${args.port || args.p || 8648}`
    url = new URL(opts.id === 'repl' ? `ws://${host}/ws` : `http://${host}`)
  }

  if (!(args.auth || args.a) && process.env.RPC_USERNAME && process.env.RPC_PASSWORD) {
    args.auth = `${process.env.RPC_USERNAME}:${process.env.RPC_PASSWORD}`
  }
  const auth = (args.auth || args.a) ? `Basic ${btoa(args.auth || args.a)}` : undefined

  if (opts.id !== 'repl') {
    // Set up single-call RPC
    Rpc.init(url, 'request', auth)
    return
  }

  try {
    await Rpc.init(url, 'socket', auth)
    this.log('Connected to RPC-Websocket:', url.href)
  } catch (error) {
    this.error(`Could not connect to RPC-Websocket at ${url.href}: ${error.message}`)
  }
}

export default hook

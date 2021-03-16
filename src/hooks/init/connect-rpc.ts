import {Hook} from '@oclif/config'
import minimist from 'minimist'

import Rpc from '../../lib/rpc'

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

  if (opts.id !== 'repl') {
    // Set up single-call RPC
    Rpc.init(url, 'request')
    return
  }

  try {
    await Rpc.init(url, 'socket')
    this.log('Connected to RPC-Websocket:', url.href)
  } catch (error) {
    this.error(`Could not connect to RPC-Websocket at ${url.href}: ${error.message}`)
  }
}

export default hook

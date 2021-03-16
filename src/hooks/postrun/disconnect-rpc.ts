import {Hook} from '@oclif/config'

import Rpc from '../../lib/rpc'
import type {Socket} from '../../lib/rpc'

const hook: Hook<'postrun'> = async function (opts) {
  this.debug('POSTRUN HOOK')

  if (opts.Command.id !== 'repl') return

  (Rpc.getClient() as Socket).close()
  this.log('Closed RPC-Websocket')
}

export default hook

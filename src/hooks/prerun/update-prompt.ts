import {Hook} from '@oclif/config'
import Rpc from '../../lib/rpc'

import type Repl from '@sisou/oclif-plugin-repl/lib/commands/repl'

const hook: Hook<'prerun'> = async function (opts) {
  if (opts.Command.id !== 'repl') return

  (opts.Command as typeof Repl).postRun = repl => repl.setPrompt(`${Rpc.getUrl().hostname} > `)
}

export default hook

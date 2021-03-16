import {Command, flags} from '@oclif/command'
import Rpc from './rpc'

export abstract class RpcCommand extends Command {
    static flags = {
      url: flags.string({
        char: 'u',
        hidden: true,
        default: '',
      }),
      host: flags.string({
        char: 'h',
        hidden: true,
      }),
      port: flags.integer({
        char: 'p',
        hidden: true,
      }),
    }

    protected $rpc = Rpc.getClient()
}

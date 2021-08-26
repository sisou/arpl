import {Command, flags} from '@oclif/command'
import Rpc from './rpc'
import type * as Parser from '@oclif/parser'
import type {IWSRequestParams} from 'rpc-websockets/dist/lib/client'

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
      timeout: flags.integer({
        char: 't',
        hidden: true,
        default: 5000,
      }),
      auth: flags.string({
        char: 'a',
        hidden: true,
      }),
    }

    protected $rpc = Rpc.getClient()

    protected parse<F, A extends {
      [name: string]: any;
    }>(options: Parser.Input<F>, argv?: string[]): Parser.Output<F, A> {
      const mergedOptions: Parser.Input<any> = {
        ...options,
        args: options.args || RpcCommand.args,
        flags: options.flags || RpcCommand.flags || {},
      }
      return super.parse(mergedOptions, argv)
    }

    protected call(command: typeof Command, method: string, params?: IWSRequestParams) {
      const {flags} = this.parse(command)
      return this.$rpc.call(method, params, flags.timeout)
    }
}

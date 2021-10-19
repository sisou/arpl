import {Command, flags} from '@oclif/command'
import Rpc from './rpc'
import type * as Parser from '@oclif/parser'
import type {IWSRequestParams} from 'rpc-websockets/dist/lib/client'
import {Staker} from './server-types'

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

    static txFlags = {
      fee: flags.integer({
        description: 'Fee in Luna (default: 0)',
        default: 0,
      }),
      'validity-start': flags.string({
        description: 'Validity start height of the transaction',
        default: '+0',
      }),
      dry: flags.boolean({
        description: 'Return serialized transaction without sending it',
      }),
    }

    static stakingSignallingFlags = {
      'fee-wallet': flags.string({
        description: 'Address of unlocked account to pay the fee from (default: fee is paid from stake)',
        dependsOn: ['fee'],
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

    protected async getFromActiveBalance(
      stakerAddress: string,
      flags: {
        fee: number;
        'fee-wallet'?: string;
        timeout: number;
      },
    ): Promise<boolean | null> {
      if (flags['fee-wallet']) return null

      const staker = await this.$rpc.call('getStakerByAddress', [stakerAddress], flags.timeout) as Staker

      if (staker.inactiveStake >= flags.fee) return false
      if (staker.activeStake >= flags.fee) return true

      throw new Error('Cannot pay fee from stake: not enough stake. Use --fee-wallet to specify which account to pay the fee from.')
    }
}

import {flags} from '@oclif/command'
import {RpcCommand} from '../../lib/rpc-command'

export default class StakeRecover extends RpcCommand {
  static description = 'Recover inactive stake to the account (unstake)'

  static aliases = ['staker:unstake']

  static args = [{
    name: 'wallet',
    description: 'Address of unlocked account that owns the stake',
    required: true,
  }, {
    // TODO: Use available amount by default
    name: 'value',
    description: 'NIM amount to recover',
    required: true,
    parse: (input: string) => parseFloat(input) * 1e5,
  }]

  static flags = {
    ...RpcCommand.flags,
    recipient: flags.string({
      description: 'Address to receive stake (default: WALLET)',
    }),
    ...RpcCommand.txFlags,
  }

  async run() {
    const {args, flags} = this.parse(StakeRecover)

    const hash = await this.call(StakeRecover, `${flags.dry ? 'create' : 'send'}UnstakeTransaction`, [
      args.wallet,
      flags.recipient || args.wallet,
      args.value,
      flags.fee,
      flags['validity-start'],
    ])

    this.log(`Transaction ${flags.dry ? 'prepared' : 'sent'}: ${hash}`)
  }
}

import {flags} from '@oclif/command'
import {RpcCommand} from '../../lib/rpc-command'

export default class StakeRecover extends RpcCommand {
  static description = 'Recover inactive stake to the account (unstake)'

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
      description: 'Address to receive stake (default: sender address)',
    }),
    fee: flags.integer({
      description: 'Fee in Luna (default: 0)',
      default: 0,
    }),
    'validity-start': flags.integer({
      description: 'Validity start height of the transaction (default: latest)',
    }),
    dry: flags.boolean({
      description: 'Return serialized transaction without sending it',
    }),
  }

  async run() {
    const {args, flags} = this.parse(StakeRecover)

    if (!flags['validity-start']) {
      flags['validity-start'] = await this.call(StakeRecover, 'getBlockNumber') as number
    }

    const hash = await this.call(StakeRecover, `${flags.dry ? 'create' : 'send'}UnstakeTransaction`, [
      args.wallet,
      flags['recipient'] || args.wallet,
      args.value,
      flags.fee,
      flags['validity-start'].toString(),
    ])

    this.log(`Transaction ${flags.dry ? 'prepared' : 'sent'}: ${hash}`)
  }
}

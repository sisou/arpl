import {flags} from '@oclif/command'
import {RpcCommand} from '../../lib/rpc-command'

export default class StakeRestart extends RpcCommand {
  static description = 'Restart staking (reactivate)'

  static args = [{
    name: 'wallet',
    description: 'Address of unlocked account to restart staking with',
    required: true,
  }, {
    // TODO: Use available amount by default
    name: 'value',
    description: 'NIM amount to stake',
    required: true,
    parse: (input: string) => parseFloat(input) * 1e5,
  }]

  static flags = {
    ...RpcCommand.flags,
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
    const {args, flags} = this.parse(StakeRestart)

    if (!flags['validity-start']) {
      flags['validity-start'] = await this.call(StakeRestart, 'getBlockNumber') as number
    }

    const hash = await this.call(StakeRestart, `${flags.dry ? 'create' : 'send'}ReactivateTransaction`, [
      args.wallet,
      args.value,
      flags.fee,
      flags['validity-start'].toString(),
    ])

    this.log(`Transaction ${flags.dry ? 'prepared' : 'sent'}: ${hash}`)
  }
}

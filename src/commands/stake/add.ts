import {flags} from '@oclif/command'
import {RpcCommand} from '../../lib/rpc-command'

export default class StakeAdd extends RpcCommand {
  static description = 'Add stake to a staker'

  static args = [{
    name: 'wallet',
    description: 'Address of unlocked account to add stake from',
    required: true,
  }, {
    name: 'value',
    description: 'NIM amount to add',
    required: true,
    parse: (input: string) => parseFloat(input) * 1e5,
  }]

  static flags = {
    ...RpcCommand.flags,
    address: flags.string({
      description: 'Staker address to add stake to (default: sender address)',
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
    const {args, flags} = this.parse(StakeAdd)

    if (!flags['validity-start']) {
      flags['validity-start'] = await this.call(StakeAdd, 'getBlockNumber') as number
    }

    const hash = await this.call(StakeAdd, `${flags.dry ? 'create' : 'send'}StakeTransaction`, [
      args.wallet,
      flags.address || args.wallet,
      args.value,
      flags.fee,
      flags['validity-start'].toString(),
    ])

    this.log(`Transaction ${flags.dry ? 'prepared' : 'sent'}: ${hash}`)
  }
}

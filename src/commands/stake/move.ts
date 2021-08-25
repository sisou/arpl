import {flags} from '@oclif/command'
import {RpcCommand} from '../../lib/rpc-command'

export default class StakeMove extends RpcCommand {
  static description = 'Move stake to another validator (update)'

  static args = [{
    name: 'wallet',
    description: 'Address of unlocked account that owns the stake',
    required: true,
  }, {
    name: 'new_validator_address',
    description: 'Address of the validator to move stake to',
    required: true,
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
    const {args, flags} = this.parse(StakeMove)

    if (!flags['validity-start']) {
      flags['validity-start'] = await this.call(StakeMove, 'getBlockNumber') as number
    }

    const hash = await this.call(StakeMove, `${flags.dry ? 'create' : 'send'}UpdateTransaction`, [
      args.wallet,
      args.new_validator_address,
      flags.fee,
      flags['validity-start'].toString(),
    ])

    this.log(`Transaction ${flags.dry ? 'prepared' : 'sent'}: ${hash}`)
  }
}

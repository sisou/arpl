import {flags} from '@oclif/command'
import {RpcCommand} from '../../lib/rpc-command'

export default class ValidatorDrop extends RpcCommand {
  static description = 'Drop an inactive validator'

  static args = [{
    name: 'wallet',
    description: 'Address of unlocked validator owner account to send transaction from',
    required: true,
  }]

  static flags = {
    ...RpcCommand.flags,
    recipient: flags.string({
      description: 'Address to receive validator deposit (default: sender address)',
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
    const {args, flags} = this.parse(ValidatorDrop)

    if (!flags['validity-start']) {
      flags['validity-start'] = await this.call(ValidatorDrop, 'getBlockNumber') as number
    }

    const hash = await this.call(ValidatorDrop, `${flags.dry ? 'create' : 'send'}DropValidatorTransaction`, [
      args.wallet,
      flags['recipient'] || args.wallet,
      flags.fee,
      flags['validity-start'].toString(),
    ])

    this.log(`Transaction ${flags.dry ? 'prepared' : 'sent'}: ${hash}`)
  }
}

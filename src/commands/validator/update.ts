import {flags} from '@oclif/command'
import {RpcCommand} from '../../lib/rpc-command'

export default class ValidatorUpdate extends RpcCommand {
  static description = 'Update reward address or secret key of a validator'

  static args = [{
    name: 'wallet',
    description: 'Address of unlocked account to send transaction from',
    required: true,
  }, {
    name: 'validator_id',
    description: 'ID of the validator to update',
    required: true,
  }, {
    name: 'secret_key',
    description: 'Current secret key of the validator',
    required: true,
  }]

  static flags = {
    ...RpcCommand.flags,
    'reward-address': flags.string({
      description: 'New reward address for the validator (default: no change)',
    }),
    'secret-key': flags.string({
      description: 'New secret key for the validator (default: no change)',
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
    const {args, flags} = this.parse(ValidatorUpdate)

    if (!flags['validity-start']) {
      flags['validity-start'] = await this.call(ValidatorUpdate, 'getBlockNumber') as number
    }

    const hash = await this.call(ValidatorUpdate, `${flags.dry ? 'create' : 'send'}UpdateValidatorTransaction`, [
      args.wallet,
      args.validator_id,
      flags['reward-address'] || null,
      args.secret_key,
      flags['secret-key'] || null,
      flags.fee,
      flags['validity-start'].toString(),
    ])

    this.log(`Transaction ${flags.dry ? 'prepared' : 'sent'}: ${hash}`)
  }
}

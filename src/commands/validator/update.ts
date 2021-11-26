import {flags} from '@oclif/command'
import {RpcCommand} from '../../lib/rpc-command'

export default class ValidatorUpdate extends RpcCommand {
  static description = 'Update reward address or secret key of a validator'

  static args = [{
    name: 'wallet',
    description: 'Address of unlocked account to send transaction from',
    required: true,
  }, {
    name: 'validator_address',
    description: 'Address of unlocked account that owns the validator',
    required: true,
  }]

  static flags = {
    ...RpcCommand.flags,
    'warm-address': flags.string({
      description: 'New address of the warm key that signs retire, reactivate & unparking transactions (default: no change)',
    }),
    'reward-address': flags.string({
      description: 'New reward address for the validator (default: no change)',
    }),
    'secret-key': flags.string({
      description: 'New secret key for the validator (default: no change)',
    }),
    'signal-data': flags.string({
      description: 'New 32-byte signal data (default: no change)',
    }),
    ...RpcCommand.txFlags,
  }

  async run() {
    const {args, flags} = this.parse(ValidatorUpdate)

    const hash = await this.call(ValidatorUpdate, `${flags.dry ? 'create' : 'send'}UpdateValidatorTransaction`, [
      args.wallet,
      args.validator_address,
      flags['warm-address'] || null,
      flags['secret-key'] || null,
      flags['reward-address'] || null,
      typeof flags['signal-data'] === 'string' ? flags['signal-data'] : null,
      flags.fee,
      flags['validity-start'],
    ])

    this.log(`Transaction ${flags.dry ? 'prepared' : 'sent'}: ${hash}`)
  }
}

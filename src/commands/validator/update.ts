import {flags} from '@oclif/command'
import {RpcCommand} from '../../lib/rpc-command'

export default class ValidatorUpdate extends RpcCommand {
  static description = 'Update reward address or secret key of a validator'

  static args = [{
    name: 'wallet',
    description: 'Address of unlocked validator owner account to send transaction from',
    required: true,
  }]

  static flags = {
    ...RpcCommand.flags,
    'warm-address': flags.string({
      description: 'New address of the warm key to sign unparking transactions (default: no change)',
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
    fee: flags.integer({
      description: 'Fee in Luna (default: 0)',
      default: 0,
    }),
    'validity-start': flags.string({
      description: 'Validity start height of the transaction (default: latest)',
      default: '+0',
    }),
    dry: flags.boolean({
      description: 'Return serialized transaction without sending it',
    }),
  }

  async run() {
    const {args, flags} = this.parse(ValidatorUpdate)

    const hash = await this.call(ValidatorUpdate, `${flags.dry ? 'create' : 'send'}UpdateValidatorTransaction`, [
      args.wallet,
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

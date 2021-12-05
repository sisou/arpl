import {flags} from '@oclif/command'
import {RpcCommand} from '../../lib/rpc-command'

export default class ValidatorUpdate extends RpcCommand {
  static description = 'Update reward address or secret key of a validator'

  static args = [{
    name: 'wallet',
    description: 'Address of unlocked account to send transaction from (fees are taken from this account)',
    required: true,
  }, {
    name: 'validator_address',
    description: 'Address of unlocked account that owns the validator',
    required: true,
  }]

  static flags = {
    ...RpcCommand.flags,
    'signing-secret-key': flags.string({
      description: 'New secret key used to sign Micro blocks and reactivate, retire & unpark transactions (default: no change)',
    }),
    'reward-address': flags.string({
      description: 'New reward address for the validator (default: no change)',
    }),
    'voting-secret-key': flags.string({
      description: 'New BLS secret key used when signing votes (default: no change)',
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
      flags['signing-secret-key'] || null,
      flags['voting-secret-key'] || null,
      flags['reward-address'] || null,
      typeof flags['signal-data'] === 'string' ? flags['signal-data'] : null,
      flags.fee,
      flags['validity-start'],
    ])

    this.log(`Transaction ${flags.dry ? 'prepared' : 'sent'}: ${hash}`)
  }
}

import {flags} from '@oclif/command'
import {RpcCommand} from '../../lib/rpc-command'

export default class ValidatorNew extends RpcCommand {
  static description = 'Register a new validator (requires 10k NIM deposit)'

  static args = [{
    name: 'wallet',
    description: 'Address of unlocked account to send transaction from (deposit and fees are taken from this account)',
    required: true,
  }, {
    name: 'signing_secret_key',
    description: 'Secret key used to sign Micro blocks and retire, reactivate & unpark transactions (default: sending address)',
    required: true,
  }, {
    name: 'voting_secret_key',
    description: 'BLS secret key used when signing votes (for Macro blocks and view changes)',
    required: true,
  }]

  static flags = {
    ...RpcCommand.flags,
    'validator-address': flags.string({
      description: 'Address of unlocked account that will own the validator (default: sending address)',
    }),
    'reward-address': flags.string({
      description: 'Reward address for the validator (default: sending address)',
    }),
    'signal-data': flags.string({
      description: '32-byte signal data (default: none)',
      default: '',
    }),
    ...RpcCommand.txFlags,
  }

  async run() {
    const {args, flags} = this.parse(ValidatorNew)

    const method = `${flags.dry ? 'create' : 'send'}NewValidatorTransaction`
    const {data: hash, metadata} = await this.call(ValidatorNew, method, [
      args.wallet,
      flags['validator-address'] || args.wallet,
      args.signing_secret_key,
      args.voting_secret_key,
      flags['reward-address'] || args.wallet,
      flags['signal-data'],
      flags.fee,
      flags['validity-start'],
    ])

    this.log(`Transaction ${flags.dry ? 'prepared' : 'sent'}: ${hash}`)
    this.showMetadataIfRequested(metadata, flags)
  }
}

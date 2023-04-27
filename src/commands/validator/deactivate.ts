import {RpcCommand} from '../../lib/rpc-command'

export default class ValidatorDeactivate extends RpcCommand {
  static description = 'Deactivate an active validator'

  static args = [{
    name: 'wallet',
    description: 'Address of unlocked account to send transaction from (fees are taken from this account)',
    required: true,
  }, {
    name: 'validator_address',
    description: 'Address of the validator',
    required: true,
  }, {
    name: 'signing_secret_key',
    description: 'Secret key used to sign the deactivate transaction',
    required: true,
  }]

  static flags = {
    ...RpcCommand.flags,
    ...RpcCommand.txFlags,
  }

  async run() {
    const {args, flags} = this.parse(ValidatorDeactivate)

    const method = `${flags.dry ? 'create' : 'send'}DeactivateValidatorTransaction`
    const {data: hash, metadata} = await this.call(ValidatorDeactivate, method, [
      args.wallet,
      args.validator_address,
      args.signing_secret_key,
      flags.fee,
      flags['validity-start'],
    ])

    this.log(`Transaction ${flags.dry ? 'prepared' : 'sent'}: ${hash}`)
    this.showMetadataIfRequested(metadata, flags)
  }
}

import {RpcCommand} from '../../lib/rpc-command'

export default class ValidatorRetire extends RpcCommand {
  static description = 'Retire an active or deactivated validator'

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
    ...RpcCommand.txFlags,
  }

  async run() {
    const {args, flags} = this.parse(ValidatorRetire)

    const method = `${flags.dry ? 'create' : 'send'}RetireValidatorTransaction`
    const {data: hash, metadata} = await this.call(ValidatorRetire, method, [
      args.wallet,
      args.validator_address,
      flags.fee,
      flags['validity-start'],
    ])

    this.log(`Transaction ${flags.dry ? 'prepared' : 'sent'}: ${hash}`)
    this.showMetadataIfRequested(metadata, flags)
  }
}

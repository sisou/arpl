import {RpcCommand} from '../../lib/rpc-command'

export default class ValidatorReactivate extends RpcCommand {
  static description = 'Reactivate an inactive validator'

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
    description: 'Secret key used to sign the reactivate transaction',
    required: true,
  }]

  static flags = {
    ...RpcCommand.flags,
    ...RpcCommand.txFlags,
  }

  async run() {
    const {args, flags} = this.parse(ValidatorReactivate)

    const hash = await this.call(ValidatorReactivate, `${flags.dry ? 'create' : 'send'}ReactivateValidatorTransaction`, [
      args.wallet,
      args.validator_address,
      args.signing_secret_key,
      flags.fee,
      flags['validity-start'],
    ])

    this.log(`Transaction ${flags.dry ? 'prepared' : 'sent'}: ${hash}`)
  }
}

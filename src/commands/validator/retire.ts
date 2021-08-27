import {RpcCommand} from '../../lib/rpc-command'

export default class ValidatorRetire extends RpcCommand {
  static description = 'Retire an active validator'

  static args = [{
    name: 'wallet',
    description: 'Address of unlocked account to send transaction from',
    required: true,
  }, {
    name: 'warm_secret_key',
    description: 'Secret key of the warm address',
    required: true,
  }]

  static flags = {
    ...RpcCommand.flags,
    ...RpcCommand.txFlags,
  }

  async run() {
    const {args, flags} = this.parse(ValidatorRetire)

    const hash = await this.call(ValidatorRetire, `${flags.dry ? 'create' : 'send'}RetireValidatorTransaction`, [
      args.wallet,
      args.warm_secret_key,
      flags.fee,
      flags['validity-start'],
    ])

    this.log(`Transaction ${flags.dry ? 'prepared' : 'sent'}: ${hash}`)
  }
}

import {flags} from '@oclif/command'
import {RpcCommand} from '../../lib/rpc-command'

export default class ValidatorUnpark extends RpcCommand {
  static description = 'Unpark a parked validator'

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
    const {args, flags} = this.parse(ValidatorUnpark)

    const hash = await this.call(ValidatorUnpark, `${flags.dry ? 'create' : 'send'}UnparkValidatorTransaction`, [
      args.wallet,
      args.warm_secret_key,
      flags.fee,
      flags['validity-start'],
    ])

    this.log(`Transaction ${flags.dry ? 'prepared' : 'sent'}: ${hash}`)
  }
}

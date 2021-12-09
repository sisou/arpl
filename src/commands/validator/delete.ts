import {flags} from '@oclif/command'
import {RpcCommand} from '../../lib/rpc-command'

export default class ValidatorDelete extends RpcCommand {
  static description = 'Delete an inactive validator'

  static args = [{
    name: 'wallet',
    description: 'Address of unlocked account that owns the validator',
    required: true,
  }]

  static flags = {
    ...RpcCommand.flags,
    recipient: flags.string({
      description: 'Address to receive validator deposit (default: sender address)',
    }),
    ...RpcCommand.txFlags,
  }

  async run() {
    const {args, flags} = this.parse(ValidatorDelete)

    const hash = await this.call(ValidatorDelete, `${flags.dry ? 'create' : 'send'}DeleteValidatorTransaction`, [
      args.wallet,
      flags.recipient || args.wallet,
      flags.fee,
      flags['validity-start'],
    ])

    this.log(`Transaction ${flags.dry ? 'prepared' : 'sent'}: ${hash}`)
  }
}

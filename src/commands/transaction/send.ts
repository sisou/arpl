import {flags} from '@oclif/command'
import {RpcCommand} from '../../lib/rpc-command'

export default class TransactionSend extends RpcCommand {
  static description = 'Send a transaction'

  static aliases = ['tx:send']

  static args = [{
    name: 'wallet',
    description: 'Address of unlocked account to send transaction from',
    required: true,
  }, {
    name: 'recipient',
    description: 'Address of recipient',
    required: true,
  }, {
    name: 'value',
    description: 'NIM amount to send',
    required: true,
    parse: (input: string) => parseFloat(input) * 1e5,
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
    const {args, flags} = this.parse(TransactionSend)

    const hash = await this.call(TransactionSend, `${flags.dry ? 'create' : 'send'}BasicTransaction`, [
      args.wallet,
      args.recipient,
      args.value,
      flags.fee,
      flags['validity-start'],
    ])

    this.log(`Transaction ${flags.dry ? 'prepared' : 'sent'}: ${hash}`)
  }
}

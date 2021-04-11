import {flags} from '@oclif/command'
import {RpcCommand} from '../../lib/rpc-command'

export default class TransactionSend extends RpcCommand {
  static description = 'Send a transaction'

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
    'validity-start': flags.integer({
      description: 'Validity start height of the transaction (default: latest)',
    }),
    dry: flags.boolean({
      description: 'Return serialized transaction without sending it',
    }),
  }

  async run() {
    const {args, flags} = this.parse(TransactionSend)

    if (!flags['validity-start']) {
      flags['validity-start'] = await this.call(TransactionSend, 'getBlockNumber') as number
    }

    const hash = await this.call(TransactionSend, `${flags.dry ? 'create' : 'send'}BasicTransaction`, [
      args.wallet,
      args.recipient,
      args.value,
      flags.fee,
      flags['validity-start'].toString(),
    ])

    this.log(`Transaction ${flags.dry ? 'prepared' : 'sent'}: ${hash}`)
  }
}

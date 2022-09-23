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
    data: flags.string({
      description: 'HEX-encoded data',
    }),
    ...RpcCommand.txFlags,
  }

  async run() {
    const {args, flags} = this.parse(TransactionSend)

    const method = `${flags.dry ? 'create' : 'send'}BasicTransaction${flags.data ? 'WithData' : ''}`
    const {data: hash, metadata} = await this.call(TransactionSend, method, [
      args.wallet,
      args.recipient,
      ...(flags.data ? [flags.data] : []),
      args.value,
      flags.fee,
      flags['validity-start'],
    ])

    this.log(`Transaction ${flags.dry ? 'prepared' : 'sent'}: ${hash}`)
    this.showMetadataIfRequested(metadata, flags)
  }
}

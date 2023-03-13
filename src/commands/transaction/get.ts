import {RpcCommand} from '../../lib/rpc-command'
import {Transaction} from '../../lib/server-types'

export default class TransactionGet extends RpcCommand {
  static description = 'Show transaction information'

  static aliases = ['tx:get']

  static args = [{
    name: 'hash',
    description: 'Transaction hash of the transaction to get',
    required: true,
  }, {
    name: 'from',
    description: 'Filter transactions by sender. Empty list means any senders',
    required: false,
  }, {
    name: 'to',
    description: 'Filter transactions by recipient. Empty list means any recipients',
    required: false,
  }]

  async run() {
    const {args, flags} = this.parse(TransactionGet)

    const {data: transaction, metadata} = await this.call<Transaction>(
      TransactionGet,
      'getTransactionByHash',
      [args.hash, args.from, args.to],
    )

    console.dir(transaction, {depth: Infinity, maxArrayLength: Infinity}) // eslint-disable-line no-console
    this.showMetadataIfRequested(metadata, flags)
  }
}

import {RpcCommand} from '../../lib/rpc-command'
import {Transaction} from '../../lib/server-types'

export default class TransactionGet extends RpcCommand {
  static description = 'Show transaction information'

  static aliases = ['tx:get']

  static args = [{
    name: 'hash',
    description: 'Transaction hash of the transaction to get',
    required: true,
  }]

  async run() {
    const {args, flags} = this.parse(TransactionGet)

    const {data: transaction, metadata} = await this.call<Transaction>(
      TransactionGet,
      'getTransactionByHash',
      [args.hash],
    )

    console.dir(transaction, {depth: Infinity, maxArrayLength: Infinity}) // eslint-disable-line no-console
    this.showMetadataIfRequested(metadata, flags)
  }
}

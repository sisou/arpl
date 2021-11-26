import {RpcCommand} from '../../lib/rpc-command'

export default class TransactionGet extends RpcCommand {
  static description = 'Show transaction information'

  static aliases = ['tx:get']

  static args = [{
    name: 'hash',
    description: 'Transaction hash of the transaction to get',
    required: true,
  }]

  async run() {
    const {args} = this.parse(TransactionGet)

    const result = await this.call(TransactionGet, 'getTransactionByHash', [args.hash, true])

    console.dir(result, {depth: Infinity, maxArrayLength: Infinity}) // eslint-disable-line no-console
  }
}

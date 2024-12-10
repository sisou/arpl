import {flags} from '@oclif/command'
import cli from 'cli-ux'
import {RpcCommand} from '../../lib/rpc-command'
import {Transaction} from '../../lib/server-types'

export default class AccountTransactions extends RpcCommand {
  static description = 'List transactions for an address (newest first)'

  static aliases = ['account:txs']

  static args = [{
    name: 'address',
    description: 'Address to display transactions for',
    required: true,
  }]

  static flags = {
    ...RpcCommand.flags,
    max: flags.integer({
      description: 'Max number of transactions to return',
      parse: input => {
        const max = parseInt(input, 10)
        if (max < 1 || max > (2 ** 16) - 1) throw new Error('--max must be between 1 and 65535 (u16)')
        return max
      },
    }),
    startAt: flags.string({
      description: 'Transaction hash to start at, used for paging',
    }),
    ...cli.table.flags(),
  }

  async run() {
    const {args, flags} = this.parse(AccountTransactions)

    const {data: transactions, metadata} = await this.call<Transaction[]>(
      AccountTransactions,
      'getTransactionsByAddress',
      [
        args.address,
        flags.max || null,
        flags.startAt || null,
      ],
    )

    cli.table(transactions, {
      blockNumber: {
        header: 'Block',
        extended: true,
      },
      timestamp: {
        header: 'Date',
        get: tx => {
          const date = new Date(tx.timestamp)
          if (flags.output) return date.toJSON()
          return date.toLocaleString()
        },
      },
      // TODO: add timeAgo field when not --extended?
      hash: {
        extended: true,
      },
      from: {},
      to: {},
      value: {
        get: tx => {
          const nim = tx.value / 1e5 * (tx.from === args.address ? -1 : 1)
          if (flags.output) return nim
          return `${nim} NIM`
        },
      },
      fee: {
        extended: true,
      },
      confirmations: {
        extended: true,
      },
      data: {
        extended: true,
        // TODO: Try to decode data into UTF8 message
      },
    }, {...flags})

    this.showMetadataIfRequested(metadata, flags)
  }
}

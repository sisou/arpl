import {flags} from '@oclif/command'
import {RpcCommand} from '../../lib/rpc-command'

export default class BlockGet extends RpcCommand {
  static description = 'Show block information'

  static args = [{
    name: 'number_or_hash',
    description: 'Block number or hash of the block to get',
    required: false,
    default: 'latest',
  }]

  static flags = {
    ...RpcCommand.flags,
    full: flags.boolean({
      description: 'Include block body (transactions, etc.)',
      default: false,
    }),
  }

  async run() {
    const {args, flags} = this.parse(BlockGet)

    let method: string
    let params: any[]

    if (args.number_or_hash === 'latest') {
      method = 'getLatestBlock'
      params = [flags.full]
    } else {
      const isBlockNumber = parseInt(args.number_or_hash, 10).toString() === args.number_or_hash
      method = isBlockNumber ? 'getBlockByNumber' : 'getBlockByHash'
      params = [
        isBlockNumber ? parseInt(args.number_or_hash, 10) : args.number_or_hash,
        flags.full,
      ]
    }

    const result = await this.call(BlockGet, method, params)

    console.dir(result, {depth: Infinity, maxArrayLength: Infinity}) // eslint-disable-line no-console
  }
}

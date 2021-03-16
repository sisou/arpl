import {flags} from '@oclif/command'
import {RpcCommand} from '../../lib/rpc-command'

export default class BlockGet extends RpcCommand {
  static description = 'Show block information'

  static args = [{
    name: 'number_or_hash',
    description: 'Block number or hash of the block to get',
    required: true,
  }]

  static flags = {
    ...RpcCommand.flags,
    full: flags.boolean({
      description: 'Include block body in information (transactions, etc.)',
      default: false,
    }),
  }

  async run() {
    const {args, flags} = this.parse(BlockGet)

    const method = args.number_or_hash === 'latest'
      ? 'blockByNumber'
      : parseInt(args.number_or_hash, 10).toString() === args.number_or_hash
        ? 'blockByNumber'
        : 'blockByHash'

    const result = await this.$rpc.call(method, [args.number_or_hash, flags.full])

    console.dir(result, {depth: Infinity, maxArrayLength: Infinity})
  }
}

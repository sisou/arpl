import {RpcCommand} from '../../lib/rpc-command'

export default class StakeList extends RpcCommand {
  static description = 'List validators and stakes'

  async run() {
    const stakes = await this.$rpc.call('listStakes')

    // TODO: Display stakes nicely
    console.dir(stakes, {depth: Infinity, maxArrayLength: Infinity})
  }
}

import {RpcCommand} from '../lib/rpc-command'

export default class Status extends RpcCommand {
  static description = 'Show the current status of the node'

  async run() {
    const blockNumber = await this.$rpc.call('blockNumber')
    // TODO: Get connected peers
    // TODO: Get consensus status
    // TODO: Get validator status

    this.log('Height:', blockNumber)
  }
}

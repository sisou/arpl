import {RpcCommand} from '../lib/rpc-command'
import chalk from 'chalk'

export default class Status extends RpcCommand {
  static description = 'Show the current status of the node'

  async run() {
    const [
      blockNumber,
      epochNumber,
      established,
    ] = await Promise.all([
      this.call(Status, 'getBlockNumber'),
      this.call(Status, 'getEpochNumber'),
      this.call(Status, 'isEstablished'),
      // TODO: Get connected peers
      // TODO: Get validator status
    ])

    this.log('Height:', blockNumber)
    this.log('Epoch:', epochNumber)
    this.log('Consensus:', established ? chalk.green('established') : chalk.yellow('syncing'))
  }
}

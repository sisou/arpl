import {RpcCommand} from '../lib/rpc-command'
import chalk from 'chalk'

export default class Status extends RpcCommand {
  static description = 'Show the current status of the node'

  async run() {
    const [
      blockNumber,
      epochNumber,
      established,
      peerCount,
    ] = await Promise.all([
      this.call(Status, 'getBlockNumber') as Promise<number>,
      this.call(Status, 'getEpochNumber') as Promise<number>,
      this.call(Status, 'isConsensusEstablished') as Promise<boolean>,
      this.call(Status, 'getPeerCount') as Promise<number>,
      // TODO: Get validator status
    ])

    this.log('Consensus:', established ? chalk.green('established') : chalk.yellow('syncing'))
    this.log('Height:', blockNumber)
    this.log('Epoch:', epochNumber)
    this.log('Peers:', peerCount)
  }
}

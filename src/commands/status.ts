import {RpcCommand} from '../lib/rpc-command'
import chalk from 'chalk'

export default class Status extends RpcCommand {
  static description = 'Show the current status of the node'

  async run() {
    const {flags} = this.parse(Status)
    const [
      {data: established, metadata: establishedMetadata},
      {data: blockNumber, metadata: blockNumberMetadata},
      {data: epochNumber, metadata: epochNumberMetadata},
      {data: peerCount, metadata: peerCountMetadata},
    ] = await Promise.all([
      this.call<boolean>(Status, 'isConsensusEstablished'),
      this.call<number>(Status, 'getBlockNumber'),
      this.call<number>(Status, 'getEpochNumber'),
      this.call<number>(Status, 'getPeerCount'),
      // TODO: Get validator status
    ])

    const showMetadata = flags['show-metadata']
    const metadataTemplate = showMetadata ? chalk.dim(' - Metadata: %O') : ''
    this.log(
      `Consensus: %s${metadataTemplate}`,
      established ? chalk.green('established') : chalk.yellow('syncing'),
      showMetadata ? establishedMetadata : '',
    )
    this.log(`Height: %d${metadataTemplate}`, blockNumber, showMetadata ? blockNumberMetadata : '')
    this.log(`Epoch: %d${metadataTemplate}`, epochNumber, showMetadata ? epochNumberMetadata : '')
    this.log(`Peers: %d${metadataTemplate}`, peerCount, showMetadata ? peerCountMetadata : '')
  }
}

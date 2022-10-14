import {RpcCommand} from '../../lib/rpc-command'

export default class PeerId extends RpcCommand {
  static description = 'Get the local peer ID of the node'

  async run() {
    const {flags} = this.parse(PeerId)

    const {data: peerId, metadata} = await this.call<string>(PeerId, 'getPeerId')

    this.log(`Peer ID: ${peerId}`)
    this.showMetadataIfRequested(metadata, flags)
  }
}

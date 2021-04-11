import {RpcCommand} from '../../lib/rpc-command'

export default class PeerId extends RpcCommand {
  static description = 'Get the local peer ID of the node'

  async run() {
    const peerId = await this.call(PeerId, 'getPeerId') as string

    this.log(`Peer ID: ${peerId}`)
  }
}

import {RpcCommand} from '../../lib/rpc-command'
import {Socket} from '../../lib/rpc'

import type {Block, PolicyConstants} from '../../lib/server-types'

export default class BlockFollow extends RpcCommand {
  static description = 'Stream blocks live'

  async run() {
    const {flags} = this.parse(BlockFollow)

    const {data: policyConstants} = await this.call<PolicyConstants>(BlockFollow, 'getPolicyConstants')
    const batchesPerEpoch = policyConstants.batchesPerEpoch

    // Throws when not in REPL
    const {data: subscriptionId, metadata} = await this.call<number>(BlockFollow, 'subscribeForHeadBlock', [true])
    this.log('Subscribed to blocks')
    this.showMetadataIfRequested(metadata, flags);

    (this.$rpc as Socket).onSubscription<Block>('subscribeForHeadBlock', subscriptionId, ({data: block, metadata}) => {
      this.log([
        block.type,
        `#${block.number}`,
        block.hash,
        `${block.transactions!.length} tx`.padStart(6, ' '),
        block.type === 'macro' ?
          block.isElectionBlock ?
            `election (epoch ${block.epoch} => ${block.epoch + 1})` :
            `checkpoint (batch ${block.batch % batchesPerEpoch}/${batchesPerEpoch})` : '',
      ].join(' ｜'))

      this.showMetadataIfRequested(metadata, flags, 'Block subscription')
    })
  }
}

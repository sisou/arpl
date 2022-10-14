import {RpcCommand} from '../../lib/rpc-command'
import {Socket} from '../../lib/rpc'

import type {Block} from '../../lib/server-types'

export default class BlockFollow extends RpcCommand {
  static description = 'Stream blocks live'

  async run() {
    const {flags} = this.parse(BlockFollow)

    // Throws when not in REPL
    const {data: subscriptionId, metadata} = await this.call<number>(BlockFollow, 'subscribeForHeadBlock', [true])
    this.log('Subscribed to blocks')
    this.showMetadataIfRequested(metadata, flags);

    (this.$rpc as Socket).onSubscription<Block>('subscribeForHeadBlock', subscriptionId, ({data: block, metadata}) => {
      const batchesPerEpoch = Math.ceil(block.batch / block.epoch)

      this.log([
        block.type,
        `#${block.number}.${block.view}`,
        block.hash,
        'producer' in block /* micro block */ ?
          block.producer.slotNumber.toString().padStart(3, ' ') /* macro block */ :
          '   ',
        block.type === 'micro' ?
          `${block.transactions!.length} tx${block.transactions!.length === 1 ? '' : 's'}` :
          block.isElectionBlock ?
            `election (epoch ${block.epoch} => ${block.epoch + 1})` :
            `checkpoint (batch ${block.batch % batchesPerEpoch}/${batchesPerEpoch})`,
      ].join(' ｜'))

      this.showMetadataIfRequested(metadata, flags, 'Block subscription')
    })
  }
}

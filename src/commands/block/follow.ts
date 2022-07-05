import {RpcCommand} from '../../lib/rpc-command'
import {Socket} from '../../lib/rpc'

import type {Block} from '../../lib/server-types'

export default class BlockFollow extends RpcCommand {
  static description = 'Stream blocks live'

  async run() {
    const subscriptionId = await this.call(BlockFollow, 'subscribeForHeadBlock', [true]) as number // Throws when not in REPL
    this.log('Subscribed to blocks');

    (this.$rpc as Socket).on('subscribeForHeadBlock', async ({result: block, subscription}: {result: Block; subscription: number}) => {
      if (subscription !== subscriptionId) return

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
    })
  }
}

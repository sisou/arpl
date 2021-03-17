import {RpcCommand} from '../../lib/rpc-command'
import {Socket} from '../../lib/rpc'

import type {Block} from '../../lib/server-types'

export default class BlockFollow extends RpcCommand {
  static description = 'Stream blocks live'

  async run() {
    const subscriptionId = await this.$rpc.call('headSubscribe') as number // Throws when not in REPL
    this.log('Subscribed to headers');

    (this.$rpc as Socket).on('subscription', async (params: {result: string; subscription: number}) => {
      if (params.subscription !== subscriptionId) return

      const block = await this.$rpc.call('blockByHash', [params.result, true]) as Block

      const batchesPerEpoch = Math.ceil(block.batch / block.epoch)

      this.log([
        block.blockType,
        `#${block.blockNumber}.${block.viewNumber}`,
        block.hash,
        'producer' in block /* micro block */ ?
          block.producer.slotNumber.toString().padStart(3, ' ') /* macro block */ :
          '   ',
        block.blockType === 'micro' ?
          `${block.transactions!.length} tx${block.transactions!.length !== 1 ? 's' : ''}` :
          block.is_election_block ?
            `election (epoch ${block.epoch} => ${block.epoch + 1})` :
            `checkpoint (batch ${block.batch % batchesPerEpoch}/${batchesPerEpoch})`,
      ].join(' ｜'))
    })
  }
}

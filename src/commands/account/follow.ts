import {RpcCommand} from '../../lib/rpc-command'
import {Socket} from '../../lib/rpc'

import type {AppliedBlockLog, RevertedBlockLog} from '../../lib/server-types'

export default class AccountFollow extends RpcCommand {
  static description = 'Stream account events live'

  static args = [{
    name: 'address',
    description: 'Address of the account to follow',
    required: true,
  }]

  async run() {
    const {args} = this.parse(AccountFollow)

    const subscriptionId = await this.call(AccountFollow, 'subscribeForLogsByAddressesAndTypes', [[args.address], []]) as number // Throws when not in REPL
    this.log('Subscribed to account events');

    (this.$rpc as Socket).on('subscribeForLogsByAddressesAndTypes', async ({result: blockLog, subscription}: { result: AppliedBlockLog | RevertedBlockLog; subscription: number }) => {
      if (subscription !== subscriptionId) return

      console.dir(blockLog, {depth: Infinity}) // eslint-disable-line no-console
    })
  }
}

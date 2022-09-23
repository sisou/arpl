import {flags} from '@oclif/command'
// import chalk from 'chalk'
import {RpcCommand} from '../../lib/rpc-command'
// import {formatBalance} from '../../lib/formatting'
import type {BlockchainState, Staker} from '../../lib/server-types'

export default class StakeGet extends RpcCommand {
  static description = 'Show information for a staker'

  static aliases = ['staker:get']

  static args = [{
    name: 'staker_address',
    description: 'Address of staker to show information for',
    required: true,
  }]

  static flags = {
    ...RpcCommand.flags,
    plain: flags.boolean({
      description: 'Display plain command output',
    }),
  }

  async run() {
    const {args, flags} = this.parse(StakeGet)

    const {data: staker, metadata} = await this.call<BlockchainState<Staker>>(
      StakeGet,
      'getStakerByAddress',
      [args.staker_address],
    )

    // if (flags.plain) {
    console.dir(staker, {depth: Infinity, maxArrayLength: Infinity}) // eslint-disable-line no-console
    //   return
    // }
    this.showMetadataIfRequested(metadata, flags)
  }
}

import { flags } from '@oclif/command'
import {RpcCommand} from '../../lib/rpc-command'

export default class StakeRemove extends RpcCommand {
  static description = 'Remove stake (unstake) back to your account'

  static aliases = ['staker:remove', 'stake:unstake', 'staker:unstake']

  static args = [{
    name: 'wallet',
    description: 'Address of unlocked account that owns the stake',
    required: true,
  }, {
    name: 'amount',
    description: 'Amount of NIM that should be removed/unstaked. Omit this argument and pass --all instead to remove/unstake all retired stake.',
    required: false,
    parse: (input: string) => parseFloat(input) * 1e5,
  }]

  static flags = {
    ...RpcCommand.flags,
    all: flags.boolean({
        description: 'Remove/unstake all retired stake',
    }),
    recipient: flags.string({
      description: 'Address to receive stake (default: WALLET)',
    }),
    ...RpcCommand.txFlags,
  }

  async run() {
    const {args, flags} = this.parse(StakeRemove)

    const staker = await this.canPayFeeFromStake(args.wallet, flags)

    let remove_amount = args.amount || 0;

    if (flags.all) {
        remove_amount = staker.retiredBalance
    }

    const method = `${flags.dry ? 'create' : 'send'}RemoveStakeTransaction`
    const {data: hash, metadata} = await this.call(StakeRemove, method, [
      args.wallet,
      flags.recipient || args.wallet,
      remove_amount,
      flags.fee,
      flags['validity-start'],
    ])

    this.log(`Transaction ${flags.dry ? 'prepared' : 'sent'}: ${hash}`)
    this.showMetadataIfRequested(metadata, flags)
  }
}

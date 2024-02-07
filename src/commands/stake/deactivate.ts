import { flags } from '@oclif/command'
import {RpcCommand} from '../../lib/rpc-command'
import { Staker } from '../../lib/server-types'

export default class StakeDeactivate extends RpcCommand {
  static description = 'Deactivate stake, for moving to another validator or retiring'

  static aliases = ['staker:deactivate']

  static args = [{
    name: 'wallet',
    description: 'Address of unlocked account that owns the stake',
    required: true,
  }, {
    name: 'amount',
    description: 'Amount of NIM that should be deactivated. Omit this argument and pass --all instead to deactivate all active stake.',
    required: false,
    parse: (input: string) => parseFloat(input) * 1e5,
  }]

  static flags = {
    ...RpcCommand.flags,
    'all': flags.boolean({
        description: 'Deactivate all active stake',
    }),
    ...RpcCommand.stakingSignallingFlags,
    ...RpcCommand.txFlags,
  }

  async run() {
    const {args, flags} = this.parse(StakeDeactivate)

    let pay_fee_from_stake = true
    let staker: Staker | undefined
    if (flags['fee-wallet']) {
      pay_fee_from_stake = false
    } else {
      staker = await this.canPayFeeFromStake(args.wallet, flags)
    }

    let new_active_balance = Infinity;
    if (flags.all) {
        new_active_balance = 0
    } else {
        staker = staker || (await this.$rpc.call('getStakerByAddress', [args.wallet])).data as Staker
        new_active_balance = staker.balance - args.amount
    }

    const method = `${flags.dry ? 'create' : 'send'}SetActiveStakeTransaction`
    const {data: hash, metadata} = await this.call(StakeDeactivate, method, [
      pay_fee_from_stake ? null : flags['fee-wallet'],
      args.wallet,
      new_active_balance,
      flags.fee,
      flags['validity-start'],
    ])

    this.log(`Transaction ${flags.dry ? 'prepared' : 'sent'}: ${hash}`)
    this.showMetadataIfRequested(metadata, flags)
  }
}

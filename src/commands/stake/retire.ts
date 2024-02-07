import {flags} from '@oclif/command'
import {RpcCommand} from '../../lib/rpc-command'
import {Staker} from '../../lib/server-types'

export default class StakeRetire extends RpcCommand {
  static description = 'Retire stake, for removing/unstaking'

  static aliases = ['staker:retire']

  static args = [{
    name: 'wallet',
    description: 'Address of unlocked account that owns the stake',
    required: true,
  }, {
    name: 'amount',
    description: 'Amount of NIM that should be retired. Omit this argument and pass --all instead to retire all inactive stake.',
    required: false,
    parse: (input: string) => parseFloat(input) * 1e5,
  }]

  static flags = {
    ...RpcCommand.flags,
    all: flags.boolean({
      description: 'Retire all inactive stake',
    }),
    ...RpcCommand.stakingSignallingFlags,
    ...RpcCommand.txFlags,
  }

  async run() {
    const {args, flags} = this.parse(StakeRetire)

    let pay_fee_from_stake = true
    let staker: Staker | undefined
    if (flags['fee-wallet']) {
      pay_fee_from_stake = false
    } else {
      staker = await this.canPayFeeFromStake(args.wallet, flags)
    }

    let retire_amount = args.amount || 0

    if (flags.all) {
      staker = staker || (await this.$rpc.call('getStakerByAddress', [args.wallet])).data as Staker
      retire_amount = staker.inactiveBalance
    }

    const method = `${flags.dry ? 'create' : 'send'}RetireStakeTransaction`
    const {data: hash, metadata} = await this.call(StakeRetire, method, [
      pay_fee_from_stake ? null : flags['fee-wallet'],
      args.wallet,
      retire_amount,
      flags.fee,
      flags['validity-start'],
    ])

    this.log(`Transaction ${flags.dry ? 'prepared' : 'sent'}: ${hash}`)
    this.showMetadataIfRequested(metadata, flags)
  }
}

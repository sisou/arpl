import { flags } from '@oclif/command'
import {RpcCommand} from '../../lib/rpc-command'

export default class StakeMove extends RpcCommand {
  static description = 'Move stake to another validator (update)'

  static aliases = ['staker:update']

  static args = [{
    name: 'wallet',
    description: 'Address of unlocked account that owns the stake',
    required: true,
  }, {
    name: 'new_validator_address',
    description: 'Address of the validator to move stake to',
    required: true,
  }]

  static flags = {
    ...RpcCommand.flags,
    'no-reactivate': flags.boolean({
      description: 'Do not reactivate all stake after changing delegation',
    }),
    ...RpcCommand.stakingSignallingFlags,
    ...RpcCommand.txFlags,
  }

  async run() {
    const {args, flags} = this.parse(StakeMove)

    let pay_fee_from_stake = true
    if (flags['fee-wallet']) {
      pay_fee_from_stake = false
    } else {
      await this.canPayFeeFromStake(args.wallet, flags)
    }

    const method = `${flags.dry ? 'create' : 'send'}UpdateStakerTransaction`
    const {data: hash, metadata} = await this.call(StakeMove, method, [
      pay_fee_from_stake ? null : flags['fee-wallet'],
      args.wallet,
      args.new_validator_address,
      !flags['no-reactivate'],
      flags.fee,
      flags['validity-start'],
    ])

    this.log(`Transaction ${flags.dry ? 'prepared' : 'sent'}: ${hash}`)
    this.showMetadataIfRequested(metadata, flags)
  }
}

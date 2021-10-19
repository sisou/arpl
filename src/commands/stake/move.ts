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
    ...RpcCommand.stakingSignallingFlags,
    ...RpcCommand.txFlags,
  }

  async run() {
    const {args, flags} = this.parse(StakeMove)

    const from_active_balance = await this.getFromActiveBalance(args.wallet, flags)

    const hash = await this.call(StakeMove, `${flags.dry ? 'create' : 'send'}UpdateTransaction`, [
      from_active_balance === null ? (flags['fee-wallet'] || args.wallet) : null,
      from_active_balance,
      args.wallet,
      args.new_validator_address,
      flags.fee,
      flags['validity-start'],
    ])

    this.log(`Transaction ${flags.dry ? 'prepared' : 'sent'}: ${hash}`)
  }
}

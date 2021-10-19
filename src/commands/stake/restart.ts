import {RpcCommand} from '../../lib/rpc-command'

export default class StakeRestart extends RpcCommand {
  static description = 'Restart staking (reactivate)'

  static aliases = ['staker:reactivate']

  static args = [{
    name: 'wallet',
    description: 'Address of unlocked account that owns the stake',
    required: true,
  }, {
    // TODO: Use available amount by default
    name: 'value',
    description: 'NIM amount to stake',
    required: true,
    parse: (input: string) => parseFloat(input) * 1e5,
  }]

  static flags = {
    ...RpcCommand.flags,
    ...RpcCommand.stakingSignallingFlags,
    ...RpcCommand.txFlags,
  }

  async run() {
    const {args, flags} = this.parse(StakeRestart)

    const from_active_balance = await this.getFromActiveBalance(args.wallet, flags)

    const hash = await this.call(StakeRestart, `${flags.dry ? 'create' : 'send'}ReactivateTransaction`, [
      from_active_balance === null ? flags['fee-wallet'] || args.wallet : null,
      from_active_balance,
      args.wallet,
      args.value,
      flags.fee,
      flags['validity-start'],
    ])

    this.log(`Transaction ${flags.dry ? 'prepared' : 'sent'}: ${hash}`)
  }
}

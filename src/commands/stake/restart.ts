import {RpcCommand} from '../../lib/rpc-command'

export default class StakeRestart extends RpcCommand {
  static description = 'Restart staking (reactivate)'

  static args = [{
    name: 'wallet',
    description: 'Address of unlocked account to restart staking with',
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
    ...RpcCommand.txFlags,
  }

  async run() {
    const {args, flags} = this.parse(StakeRestart)

    const hash = await this.call(StakeRestart, `${flags.dry ? 'create' : 'send'}ReactivateTransaction`, [
      args.wallet,
      args.value,
      flags.fee,
      flags['validity-start'],
    ])

    this.log(`Transaction ${flags.dry ? 'prepared' : 'sent'}: ${hash}`)
  }
}

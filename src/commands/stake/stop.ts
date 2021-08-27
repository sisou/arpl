import {RpcCommand} from '../../lib/rpc-command'

export default class StakeStop extends RpcCommand {
  static description = 'Stop staking (retire)'

  static aliases = ['staker:retire']

  static args = [{
    name: 'wallet',
    description: 'Address of unlocked account that owns the stake',
    required: true,
  }, {
    // TODO: Use available amount by default
    name: 'value',
    description: 'NIM amount to retire',
    required: true,
    parse: (input: string) => parseFloat(input) * 1e5,
  }]

  static flags = {
    ...RpcCommand.flags,
    ...RpcCommand.txFlags,
  }

  async run() {
    const {args, flags} = this.parse(StakeStop)

    const hash = await this.call(StakeStop, `${flags.dry ? 'create' : 'send'}RetireTransaction`, [
      args.wallet,
      args.value,
      flags.fee,
      flags['validity-start'],
    ])

    this.log(`Transaction ${flags.dry ? 'prepared' : 'sent'}: ${hash}`)
  }
}

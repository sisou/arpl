import {flags} from '@oclif/command'
import {RpcCommand} from '../../lib/rpc-command'

export default class StakeStart extends RpcCommand {
  static description = 'Start staking with a validator (stake)'

  static args = [{
    name: 'wallet',
    description: 'Address of unlocked account to start staking with',
    required: true,
  }, {
    name: 'validator_id',
    description: 'ID of the validator to stake with',
    required: true,
  }, {
    name: 'value',
    description: 'NIM amount to stake',
    required: true,
    parse: (input: string) => parseFloat(input) * 1e5,
  }]

  static flags = {
    ...RpcCommand.flags,
    fee: flags.integer({
      description: 'Fee in Luna (default: 0)',
      default: 0,
    }),
    'validity-start': flags.integer({
      description: 'Validity start height of the transaction (default: latest)',
    }),
    dry: flags.boolean({
      description: 'Return serialized transaction without sending it',
    }),
  }

  async run() {
    const {args, flags} = this.parse(StakeStart)

    if (!flags['validity-start']) {
      flags['validity-start'] = await this.$rpc.call('getBlockNumber') as number
    }

    const hash = await this.$rpc.call(`${flags.dry ? 'create' : 'send'}StakeTransaction`, [
      args.wallet,
      args.validator_id,
      args.value,
      flags.fee,
      flags['validity-start'].toString(),
    ])

    this.log(`Transaction ${flags.dry ? 'prepared' : 'sent'}: ${hash}`)
  }
}

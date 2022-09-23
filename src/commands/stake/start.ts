import {flags} from '@oclif/command'
import {RpcCommand} from '../../lib/rpc-command'

export default class StakeStart extends RpcCommand {
  static description = 'Start staking with a validator (new staker)'

  static aliases = ['staker:new']

  static args = [{
    name: 'wallet',
    description: 'Address of unlocked account to start staking from',
    required: true,
  }, {
    name: 'validator_address',
    description: 'Address of the validator to stake with',
    required: true,
  }, {
    name: 'value',
    description: 'NIM amount to stake',
    required: true,
    parse: (input: string) => parseFloat(input) * 1e5,
  }]

  static flags = {
    ...RpcCommand.flags,
    ...RpcCommand.txFlags,
    'staker-wallet': flags.string({
      description: 'Address of unlocked staker account (default: WALLET)',
    }),
  }

  async run() {
    const {args, flags} = this.parse(StakeStart)

    const method = `${flags.dry ? 'create' : 'send'}NewStakerTransaction`
    const {data: hash, metadata} = await this.call(StakeStart, method, [
      args.wallet,
      flags['staker-wallet'] || args.wallet,
      args.validator_address,
      args.value,
      flags.fee,
      flags['validity-start'],
    ])

    this.log(`Transaction ${flags.dry ? 'prepared' : 'sent'}: ${hash}`)
    this.showMetadataIfRequested(metadata, flags)
  }
}

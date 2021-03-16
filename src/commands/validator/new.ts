import {flags} from '@oclif/command'
import {RpcCommand} from '../../lib/rpc-command'

import type {Block} from '../../lib/server-types'

export default class ValidatorNew extends RpcCommand {
  static description = 'Register a new validator'

  static args = [{
    name: 'wallet',
    description: 'Address of unlocked account to send transaction from',
    required: true,
  }, {
    name: 'secret_key',
    description: 'Secret key of the new validator',
    required: true,
  }, {
    name: 'value',
    description: 'NIM amount to stake (min. 1000 NIM)',
    required: true,
    parse: (input: string) => parseFloat(input) * 1e5,
  }]

  static flags = {
    ...RpcCommand.flags,
    'reward-address': flags.string({
      description: 'Reward address for the validator (default: sending address)',
    }),
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
    const {args, flags} = this.parse(ValidatorNew)

    if (!flags['validity-start']) {
      flags['validity-start'] = (await this.$rpc.call('blockByNumber', ['latest', false]) as Block).blockNumber
    }

    const hash = await this.$rpc.call(`${flags.dry ? 'create' : 'send'}NewValidatorTransaction`, [
      args.wallet,
      flags['reward-address'] || args.wallet,
      args.secret_key,
      args.value,
      flags.fee,
      flags['validity-start'].toString(),
    ])

    this.log(`Transaction ${flags.dry ? 'prepared' : 'sent'}: ${hash}`)
  }
}

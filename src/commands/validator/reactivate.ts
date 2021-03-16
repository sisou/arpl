import {flags} from '@oclif/command'
import {RpcCommand} from '../../lib/rpc-command'

import type {Block} from '../../lib/server-types'

export default class ValidatorReactivate extends RpcCommand {
  static description = 'Reactivate an inactive validator'

  static args = [{
    name: 'wallet',
    description: 'Address of unlocked account to send transaction from',
    required: true,
  }, {
    name: 'validator_id',
    description: 'ID of the validator to reactivate',
    required: true,
  }, {
    name: 'secret_key',
    description: 'Secret key of the validator to reactivate',
    required: true,
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
    const {args, flags} = this.parse(ValidatorReactivate)

    if (!flags['validity-start']) {
      flags['validity-start'] = (await this.$rpc.call('blockByNumber', ['latest', false]) as Block).blockNumber
    }

    const hash = await this.$rpc.call(`${flags.dry ? 'create' : 'send'}ReactivateValidatorTransaction`, [
      args.wallet,
      args.validator_id,
      args.secret_key,
      flags.fee,
      flags['validity-start'].toString(),
    ])

    this.log(`Transaction ${flags.dry ? 'prepared' : 'sent'}: ${hash}`)
  }
}

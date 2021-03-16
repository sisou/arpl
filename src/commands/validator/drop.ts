import {flags} from '@oclif/command'
import {RpcCommand} from '../../lib/rpc-command'

import type {Block} from '../../lib/server-types'

export default class ValidatorDrop extends RpcCommand {
  static description = 'Drop an inactive validator'

  static args = [{
    name: 'validator_id',
    description: 'ID of the validator to drop',
    required: true,
  }, {
    name: 'secret_key',
    description: 'Secret key of the validator to drop',
    required: true,
  }, {
    // TODO: Use reward address by default
    name: 'recipient',
    description: 'Address to receive validator stake',
    required: true,
  }, {
    // TODO: Use available amount by default
    name: 'value',
    description: 'NIM amount to drop',
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
    const {args, flags} = this.parse(ValidatorDrop)

    if (!flags['validity-start']) {
      flags['validity-start'] = (await this.$rpc.call('blockByNumber', ['latest', false]) as Block).blockNumber
    }

    const hash = await this.$rpc.call(`${flags.dry ? 'create' : 'send'}DropValidatorTransaction`, [
      args.validator_id,
      args.recipient,
      args.secret_key,
      args.value,
      flags.fee,
      flags['validity-start'].toString(),
    ])

    this.log(`Transaction ${flags.dry ? 'prepared' : 'sent'}: ${hash}`)
  }
}

import {flags} from '@oclif/command'
import {RpcCommand} from '../../lib/rpc-command'

import type {Block} from '../../lib/server-types'

export default class StakeRecover extends RpcCommand {
  static description = 'Recover stopped stake to the account (unstake)'

  static args = [{
    name: 'wallet',
    description: 'Address of unlocked account that owns the stake',
    required: true,
  }, {
    // TODO: Use available amount by default
    name: 'value',
    description: 'NIM amount to recover',
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
    const {args, flags} = this.parse(StakeRecover)

    if (!flags['validity-start']) {
      flags['validity-start'] = (await this.$rpc.call('blockByNumber', ['latest', false]) as Block).blockNumber
    }

    const hash = await this.$rpc.call(`${flags.dry ? 'create' : 'send'}RetireTransaction`, [
      args.wallet,
      args.wallet,
      args.value,
      flags.fee,
      flags['validity-start'].toString(),
    ])

    this.log(`Transaction ${flags.dry ? 'prepared' : 'sent'}: ${hash}`)
  }
}

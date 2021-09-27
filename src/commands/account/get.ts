import {RpcCommand} from '../../lib/rpc-command'
import {formatBalance} from '../../lib/formatting'
import { Account } from '../../lib/server-types'

export default class AccountGet extends RpcCommand {
  static description = 'Show account information'

  static args = [{
    name: 'address',
    description: 'Address of the account to display',
    required: true,
  }]

  static flags = {
    ...RpcCommand.flags,
  }

  async run() {
    const {args} = this.parse(AccountGet)

    const account = await this.call(AccountGet, 'getAccount', [args.address]) as Account

    this.log(`Type: ${account.type}`)
    this.log(`Balance: ${formatBalance(account.balance)}`)
    if (account.type !== 'basic') {
      console.dir(account, {depth: Infinity, maxArrayLength: Infinity}) // eslint-disable-line no-console
    }
  }
}

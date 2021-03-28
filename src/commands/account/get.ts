import {RpcCommand} from '../../lib/rpc-command'
import {formatBalance} from '../../lib/formatting'

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

    const result = await this.$rpc.call('getAccount', [args.address]) as {
      Basic: {
        balance: number;
      };
    } | {
      Vesting: {
        balance: number;
      };
    } | {
      HTLC: {
        balance: number;
      };
    }

    let type: 'basic' | 'vesting' | 'htlc' | undefined
    let account: { balance: number } | undefined
    if ('Basic' in result) {
      type = 'basic'
      account = result.Basic
    } else if ('Vesting' in result) {
      type = 'vesting'
      account = result.Vesting
    } else if ('HTLC' in result) {
      type = 'htlc'
      account = result.HTLC
    } else throw new Error('Unknown account type')

    this.log(`Type: ${type}`)
    this.log(`Balance: ${formatBalance(account.balance)}`)
    if (type !== 'basic') {
      console.dir(account, {depth: Infinity, maxArrayLength: Infinity})
    }
  }
}

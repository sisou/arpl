import {RpcCommand} from '../../lib/rpc-command'

export default class AccountLock extends RpcCommand {
  static description = 'Lock an account'

  static args = [{
    name: 'address',
    description: 'Address of the account to lock',
    required: true,
  }]

  static flags = {
    ...RpcCommand.flags,
  }

  async run() {
    const {args} = this.parse(AccountLock)

    await this.$rpc.call('lockAccount', [args.address])

    this.log(`Account locked: ${args.address}`)
  }
}

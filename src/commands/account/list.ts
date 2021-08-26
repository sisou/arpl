import {RpcCommand} from '../../lib/rpc-command'

export default class AccountList extends RpcCommand {
  static description = 'List accounts available in node'

  async run() {
    const accounts = await this.call(AccountList, 'listAccounts')

    // TODO: Display accounts nicely
    console.dir(accounts, {depth: Infinity, maxArrayLength: Infinity}) // eslint-disable-line no-console
  }
}

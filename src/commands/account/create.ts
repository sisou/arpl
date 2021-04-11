import {flags} from '@oclif/command'
import {RpcCommand} from '../../lib/rpc-command'

export default class AccountCreate extends RpcCommand {
  static description = 'Create a new account in the node'

  static flags = {
    ...RpcCommand.flags,
    password: flags.string({
      description: 'Password to encrypt the key',
      default: '',
    }),
    unlock: flags.boolean({
      description: 'Unlock the account after creation',
    }),
  }

  async run() {
    const {flags} = this.parse(AccountCreate)

    const account = await this.call(AccountCreate, 'createAccount', [flags.password || null]) as {
      address: string;
      publicKey: string;
      privateKey: string;
    }

    if (flags.unlock) {
      this.log('Account created, unlocking...')
      await this.call(AccountCreate, 'unlockAccount', [account.address, flags.password || null, /* duration */ null])
    }

    this.log(`Account created: ${account.address} (${flags.unlock ? 'unlocked' : 'locked'})`)
    this.log(`Private key: ${account.privateKey}`)
  }
}

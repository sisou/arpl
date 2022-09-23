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

    const {data: account, metadata: creationMetadata} = await this.call<{
      address: string;
      publicKey: string;
      privateKey: string;
    }>(AccountCreate, 'createAccount', [flags.password || null])

    let unlockMetadata
    if (flags.unlock) {
      this.log('Account created, unlocking...');
      ({metadata: unlockMetadata} = await this.call(
        AccountCreate,
        'unlockAccount',
        [account.address, flags.password || null, /* duration */ null],
      ))
    }

    this.log(`Account created: ${account.address} (${flags.unlock ? 'unlocked' : 'locked'})`)
    this.log(`Private key: ${account.privateKey}`)
    this.showMetadataIfRequested(creationMetadata, flags, flags.unlock ? 'Creation' : undefined)
    if (flags.unlock) {
      this.showMetadataIfRequested(unlockMetadata, flags, 'Unlock')
    }
  }
}

import {flags} from '@oclif/command'
import {RpcCommand} from '../../lib/rpc-command'

export default class AccountUnlock extends RpcCommand {
  static description = 'Unlock an account'

  static args = [{
    name: 'address',
    description: 'Address of the account to unlock',
    required: true,
  }]

  static flags = {
    ...RpcCommand.flags,
    password: flags.string({
      description: 'Password to decrypt the key',
      default: '',
    }),
  }

  async run() {
    const {args, flags} = this.parse(AccountUnlock)

    await this.call(AccountUnlock, 'unlockAccount', [args.address, flags.password || null, /* duration */ null])

    this.log(`Account unlocked: ${args.address}`)
  }
}

import {flags} from '@oclif/command'
import cli from 'cli-ux'
import chalk from 'chalk'
import {RpcCommand} from '../../lib/rpc-command'
import {formatBalance} from '../../lib/formatting'
import type {Validator} from '../../lib/server-types'

export default class ValidatorGet extends RpcCommand {
  static description = 'Show information for a validator'

  static args = [{
    name: 'validator_address',
    description: 'Address of validator to show information for',
    required: true,
  }]

  static flags = {
    ...RpcCommand.flags,
    'include-stakers': flags.boolean({
      description: 'Include a list of the validator\'s stakers',
    }),
    plain: flags.boolean({
      description: 'Display plain command output',
    }),
  }

  async run() {
    const {args, flags} = this.parse(ValidatorGet)

    const validator = await this.call(ValidatorGet, 'getValidator', [
      args.validator_address,
      flags['include-stakers'],
    ]) as Validator

    // if (flags.plain) {
      console.dir(validator, {depth: Infinity, maxArrayLength: Infinity})
      return
    // }
  }
}

import {flags} from '@oclif/command'
import cli from 'cli-ux'
import chalk from 'chalk'
import {RpcCommand} from '../../lib/rpc-command'
import {formatBalance} from '../../lib/formatting'
import { Stakes } from '../../lib/server-types'

export default class StakeList extends RpcCommand {
  static description = 'List validators and their stakes'

  static flags = {
    ...RpcCommand.flags,
    plain: flags.boolean({
      description: 'Display plain command output',
    }),
  }

  async run() {
    const {flags} = this.parse(StakeList)

    const stakes = await this.call(StakeList, 'listStakes') as Stakes

    // if (flags.plain) {
      console.dir(stakes, {depth: Infinity, maxArrayLength: Infinity})
      return
    // }

    // TODO: Highlight own validator
    // TODO: Highlight accounts stored in the node

    // const totalActiveValidatorStake = stakes.activeValidators.reduce((sum, validator) => sum + validator.balance, 0)
    // const totalInactiveValidatorStake = stakes.inactiveValidators.reduce((sum, validator) => sum + validator.balance, 0)
    // const totalInactiveStake = stakes.inactiveStakes.reduce((sum, stake) => sum + stake.balance, 0)

    // this.log(`# Active Validators (${formatBalance(totalActiveValidatorStake)})`)
    // stakes.activeValidators.sort((a, b) => b.balance - a.balance)
    // for (const validator of stakes.activeValidators) {
    //   this.log(`${validator.id} | ${validator.rewardAddress} | ${formatBalance(validator.balance)} (${Math.round(validator.balance / totalActiveValidatorStake * 1000) / 10}%)`)

    //   validator.stakes.sort((a, b) => b.balance - a.balance)

    //   const tree = cli.tree()
    //   for (const stake of validator.stakes) {
    //     tree.insert(`${stake.staker_address} | ${formatBalance(stake.balance)}`)
    //   }
    //   tree.display()
    // }
    // if (stakes.activeValidators.length === 0) this.log('-none-')

    // this.log(`\n# Inactive Validators (${formatBalance(totalInactiveValidatorStake)})`)
    // for (const validator of stakes.inactiveValidators) {
    //   this.log(`${validator.id} | ${validator.rewardAddress} | ${formatBalance(validator.balance)}`)

    //   const tree = cli.tree()
    //   for (const stake of validator.stakes) {
    //     tree.insert(`${stake.staker_address} | ${formatBalance(stake.balance)}`)
    //   }
    //   tree.display()
    // }
    // if (stakes.inactiveValidators.length === 0) this.log('-none-')

    // this.log(`\n# Inactive Stakes (${formatBalance(totalInactiveStake)})`)
    // for (const stake of stakes.inactiveStakes) {
    //   this.log(`${stake.staker_address} | ${formatBalance(stake.balance)}`)
    // }
    // if (stakes.inactiveStakes.length === 0) this.log('-none-')
  }
}

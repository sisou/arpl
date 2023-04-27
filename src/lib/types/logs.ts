import {Address, Coin} from './common'

export type PayoutInherentLog = {
    type: 'payout-reward';
    to: Address;
    value: Coin;
}

export type ParkInherentLog = {
    type: 'park';
    validatorAddress: Address;
    eventBlock: number;
}

export type SlashInherentLog = {
    type: 'slash';
    validatorAddress: Address;
    eventBlock: number;
    slot: number;
    newlyDisabled: boolean;
}

export type RevertContractInherentLog = {
    type: 'revert-contract';
    contractAddress: Address;
}

export type InherentLog = PayoutInherentLog | ParkInherentLog | SlashInherentLog | RevertContractInherentLog

export type PayFeeLog = {
    type: 'pay-fee';
    from: string;
    fee: number;
}

export type TransferLog = {
    type: 'transfer';
    from: Address;
    to: Address;
    amount: Coin;
}

export type CreateValidatorLog = {
    type: 'create-validator';
    validatorAddress: Address;
    rewardAddress: Address;
}

export type UpdateValidatorLog = {
    type: 'update-validator';
    validatorAddress: Address;
    oldRewardAddress: Address;
    newRewardAddress: Address | null;
}

export type DeactivateValidatorLog = {
    type: 'deactivate-validator';
    validatorAddress: Address;
}

export type ReactivateValidatorLog = {
    type: 'reactivate-validator';
    validatorAddress: Address;
}

export type UnparkValidatorLog = {
    type: 'unpark-validator';
    validatorAddress: Address;
}

export type RetireValidatorLog = {
    type: 'retire-validator';
    validatorAddress: Address;
}

export type DeleteValidatorLog = {
    type: 'delete-validator';
    validatorAddress: Address;
    rewardAddress: Address;
}

export type CreateStakerLog = {
    type: 'create-staker';
    stakerAddress: Address;
    validatorAddress: Address | null;
    value: Coin;
}

export type StakeLog = {
    type: 'stake';
    stakerAddress: Address;
    validatorAddress: Address | null;
    value: Coin;
}

export type UpdateStakerLog = {
    type: 'update-staker';
    stakerAddress: Address;
    oldValidatorAddress: Address | null;
    newValidatorAddress: Address | null;
}

export type UnstakeLog = {
    type: 'unstake';
    stakerAddress: Address;
    validatorAddress: Address | null;
    value: Coin;
}

export type Log = PayFeeLog | TransferLog | CreateValidatorLog | UpdateValidatorLog | DeactivateValidatorLog | RetireValidatorLog | ReactivateValidatorLog | UnparkValidatorLog | DeleteValidatorLog | CreateStakerLog | StakeLog | UpdateStakerLog | UnstakeLog

export type TransactionLog = {
    hash: string;
    logs: Log[];
}

type BlockLog = {
    inherents: InherentLog[];
    blockHash: string;
    blockNumber: number;
    transactions: TransactionLog[];
}

export type AppliedBlockLog = BlockLog & {
    type: 'applied-block';
    timestamp: number;
}

export type RevertedBlockLog = BlockLog & {
    type: 'reverted-block';
}

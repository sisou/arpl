export const STAKING_CONTRACT_ADDRESS = 'NQ38 STAK 1NG0 0000 0000 C0NT RACT 0000 0000'

export type Transaction = {
    blockNumber: number;
    confirmations: number;
    data: string;
    fee: number;
    flags: number;
    from: string;
    hash: string;
    proof: string;
    timestamp: number;
    to: string;
    validityStartHeight: number;
    value: number;
}

export enum BlockType {
    MICRO = 'micro',
    MACRO = 'macro',
}

export type MicroBlock = {
    batch: number;
    blockNumber: number;
    blockType: BlockType.MICRO;
    bodyRoot: string;
    epoch: number;
    extra_data: string;
    fork_proofs: any[];
    hash: string;
    justification: {
        signature: string;
        viewChangeProof: any | null;
    };
    parentHash: string;
    producer: {
        publicKey: string;
        slotNumber: number;
        validatorId: string;
    };
    seed: string;
    stateRoot: string;
    timestamp: number;
    transactions?: Transaction[];
    type: BlockType.MICRO;
    viewNumber: number;
}

export type MacroBlock = {
    batch: number;
    blockNumber: number;
    blockType: BlockType.MACRO;
    bodyRoot: string;
    epoch: number;
    hash: string;
    is_election_block: boolean;
    justification: {
        round: number;
        sig: {
            signature: string;
            signers: number[];
        };
        votes: number;
    };
    lost_reward_set: [];
    parentHash: string;
    parent_election_hash: string;
    seed: string;
    slots: {
        firstSlotNumber: number;
        numSlots: number;
        publicKey: string;
        validatorId: string;
    }[];
    stateRoot: string;
    timestamp: number;
    transactions?: Transaction[];
    type: BlockType.MACRO;
    viewNumber: number;
}

export type Block = MicroBlock | MacroBlock

export type Staker = {
    address: string;
    active_stake: number;
    inactive_stake: number;
    delegation?: string;
    retire_time: number;
}

export type Validator = {
    address: string,
    warm_key: string,
    validator_key: string,
    reward_address: string,
    signal_data?: string,
    balance: number;
    num_stakers: number,
    inactivity_flag?: number,
    stakers?: {[address: string]: number};
}

// export type Stakes = {
//     activeValidators: ValidatorStake[];
//     inactiveStakes: (Stake & { retire_time: number })[];
//     inactiveValidators: ValidatorStake[];
// }

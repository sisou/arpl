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
    type: BlockType.MACRO;
    viewNumber: number;
}

export type Block = MicroBlock | MacroBlock

export type Stake = {
    balance: number;
    staker_address: string;
}

export type ValidatorStake = {
    balance: number;
    id: string;
    publicKey: string;
    rewardAddress: string;
    stakes: Stake[];
}

export type Stakes = {
    activeValidators: ValidatorStake[];
    inactiveStakes: (Stake & { retire_time: number })[];
    inactiveValidators: ValidatorStake[];
}

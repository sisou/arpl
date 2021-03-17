export type MicroBlock = {
    batch: number;
    blockNumber: number;
    blockType: 'micro';
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
        slotNumber: 478;
        validatorId: string;
    };
    seed: string;
    stateRoot: string;
    timestamp: number;
    transactions?: string[];
    type: 'micro';
    viewNumber: number;
}

export type MacroBlock = {
    batch: number;
    blockNumber: number;
    blockType: 'macro';
    bodyRoot: string;
    epoch: number;
    hash: string;
    is_election_block: true;
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
    type: 'macro';
    viewNumber: number;
}

export type Block = MicroBlock | MacroBlock

export type ValidatorStake = {
    balance: number;
    id: string;
    publicKey: string;
    rewardAddress: string;
    stakes: Stake[];
}

export type Stake = {
    balance: number;
    staker_address: string;
}

export type Stakes = {
    activeValidators: ValidatorStake[];
    inactiveStakes: (Stake & { retire_time: number })[];
    inactiveValidators: ValidatorStake[];
}

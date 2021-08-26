export const STAKING_CONTRACT_ADDRESS = 'NQ38 STAK 1NG0 0000 0000 C0NT RACT 0000 0000'

export type Address = string
export type Coin = number

export type Transaction = {
    blockNumber: number;
    confirmations: number;
    data: string;
    fee: Coin;
    flags: number;
    from: Address;
    hash: string;
    proof: string;
    timestamp: number;
    to: Address;
    validityStartHeight: number;
    value: Coin;
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
        validator: Address;
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
        validator: Address;
    }[];
    stateRoot: string;
    timestamp: number;
    transactions?: Transaction[];
    type: BlockType.MACRO;
    viewNumber: number;
}

export type Block = MicroBlock | MacroBlock

export type Stakes = Record<Address, Coin>

export type Staker = {
    address: Address;
    active_stake: Coin;
    inactive_stake: Coin;
    delegation?: Address;
    retire_time: number;
}

export type Validator = {
    address: Address,
    warm_key: Address,
    validator_key: string,
    reward_address: Address,
    signal_data?: string,
    balance: Coin;
    num_stakers: number,
    inactivity_flag?: number,
    stakers?: Stakes,
}

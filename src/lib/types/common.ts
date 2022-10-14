export type Address = string
export type Coin = number

export const STAKING_CONTRACT_ADDRESS = 'NQ38 STAK 1NG0 0000 0000 C0NT RACT 0000 0000'

export type RpcResponse<R> = {
    data: R;
    metadata?: Record<string, unknown> | null;
}

export enum AccountType {
    BASIC = 'basic',
    VESTING = 'vesting',
    HTLC = 'htlc',
}

export type BasicAccount = {
    type: AccountType.BASIC;
    address: Address;
    balance: Coin;
}

export type VestingAccount = {
    type: AccountType.VESTING;
    address: Address;
    balance: Coin;
    owner: Address;
    vestingStart: number;
    vestingStepBlocks: number;
    vestingStepAmount: Coin;
    vestingTotalAmount: Coin;
}

export type HtlcAccount = {
    type: AccountType.HTLC;
    address: Address;
    balance: Coin;
    sender: Address;
    recipient: Address;
    hashRoot: string;
    hashCount: number;
    timeout: number;
    totalAmount: Coin;
}

export type Account = BasicAccount | VestingAccount | HtlcAccount

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
    number: number;
    type: BlockType.MICRO;
    bodyHash: string;
    epoch: number;
    extraData: string;
    hash: string;
    parentHash: string;
    producer: {
        publicKey: string;
        slotNumber: number;
        validator: Address;
    };
    seed: {
        signature: number[];
    };
    stateHash: string;
    timestamp: number;
    view: number;
    forkProofs?: any[];
    justification?: {
        signature: number[];
        viewChangeProof: any | null;
    };
    transactions?: Transaction[];
}

export type MacroBlock = {
    batch: number;
    number: number;
    type: BlockType.MACRO;
    bodyHash: string;
    epoch: number;
    extraData: string;
    hash: string;
    isElectionBlock: boolean;
    parentHash: string;
    parentElectionHash: string;
    seed: {
        signature: number[];
    };
    stateHash: string;
    timestamp: number;
    view: number;
    lostRewardSet?: [];
    disabledSet?: [];
    slots?: {
        firstSlotNumber: number;
        numSlots: number;
        publicKey: string;
        validator: Address;
    }[];
    justification?: {
        round: number;
        sig: {
            signature: string;
            signers: number[];
        };
        votes: number;
    };
    transactions?: Transaction[];
}

export type Block = MicroBlock | MacroBlock

export type Staker = {
    address: Address;
    balance: Coin;
    delegation?: Address;
}

export type Validator = {
    address: Address;
    signingKey: string;
    votingKey: string;
    rewardAddress: Address;
    signalData?: string;
    balance: Coin;
    numStakers: number;
    inactivityFlag?: number;
    stakers?: Staker[];
}

export type BlockchainState<T> = T & {
    blockNumber: number;
    blockHash: string;
}

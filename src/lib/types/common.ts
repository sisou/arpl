export type Address = string
export type Coin = number

export const STAKING_CONTRACT_ADDRESS = 'NQ38 STAK 1NG0 0000 0000 C0NT RACT 0000 0000'

export type RpcResponse<R> = {
    data: R;
    metadata?: Record<string, unknown> | null;
}

export type PolicyConstants = {
    stakingContractAddress: string;
    coinbaseAddress: string;
    transactionValidityWindow: number;
    maxSizeMicroBody: number;
    version: number;
    slots: number;
    blocksPerBatch: number;
    batchesPerEpoch: number;
    blocksPerEpoch: number;
    validatorDeposit: number;
    totalSupply: number;
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
    hash: string;
    blockNumber: number;
    timestamp: number;
    confirmations: number;
    from: Address;
    to: Address;
    value: Coin;
    fee: Coin;
    data: string;
    flags: number;
    validityStartHeight: number;
    proof: string;
    executionResult: boolean;
}

export enum BlockType {
    MICRO = 'micro',
    MACRO = 'macro',
}

export type MicroBlock = {
    type: BlockType.MICRO;
    hash: string;
    size: number;
    batch: number;
    epoch: number;
    version: number;
    number: number;
    timestamp: number;
    parentHash: string;
    seed: {
        signature: number[];
    };
    extraData: string;
    stateHash: string;
    bodyHash: string;
    historyHash: string;
    transactions?: Transaction[];
    producer: {
        slotNumber: number;
        validator: Address;
        publicKey: string;
    };
    forkProofs?: any[];
    justification?: {
        micro: string;
    } | {
        skip: {
            sig: {
                signature: string;
                signers: number[];
            };
        };
    };
}

export type MacroBlock = {
    type: BlockType.MACRO;
    hash: string;
    size: number;
    batch: number;
    epoch: number;
    version: number;
    number: number;
    timestamp: number;
    parentHash: string;
    seed: {
        signature: number[];
    };
    extraData: string;
    stateHash: string;
    bodyHash: string;
    historyHash: string;
    transactions?: Transaction[];
    isElectionBlock: boolean;
    parentElectionHash: string;
    lostRewardSet?: any[];
    disabledSet?: any[];
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
    };
}

export type Block = MicroBlock | MacroBlock

export type Staker = {
    address: Address;
    balance: Coin;
    delegation?: Address;
    inactiveBalance: Coin;
    inactiveFrom: number | null;
    retiredBalance: Coin;
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

@sisou/albatross-remote (arpl)
=======================

Straight-forward remote management for Nimiq Albatross nodes

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@sisou/albatross-remote.svg)](https://npmjs.org/package/@sisou/albatross-remote)
[![Downloads/week](https://img.shields.io/npm/dw/@sisou/albatross-remote.svg)](https://npmjs.org/package/@sisou/albatross-remote)
[![License](https://img.shields.io/npm/l/@sisou/albatross-remote.svg)](https://github.com/sisou/albatross-remote/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Connection Options](#connection-options)
* [Request Options](#request-options)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @sisou/albatross-remote
$ arpl COMMAND
running command...
$ arpl (-v|--version|version)
@sisou/albatross-remote/0.7.0 linux-x64 node-v14.18.1
$ arpl --help [COMMAND]
USAGE
  $ arpl COMMAND
...
```
<!-- usagestop -->

# Connection Options
```sh-session
  -u, --url   The URL of the RPC server, overwrites host and port
              options (default: [http|ws]://localhost:8648[/ws])
  -h, --host  Hostname of the RPC server (default: localhost)
  -p, --port  Port of the RPC server (default: 8648)

```

# Request Options
```sh-session
  -t, --timeout  Timeout for request in ms, set to 0 to disable (default: 5000)
```

# Commands
<!-- commands -->
* [`arpl account:create`](#arpl-accountcreate)
* [`arpl account:get ADDRESS`](#arpl-accountget-address)
* [`arpl account:import PRIVATEKEY`](#arpl-accountimport-privatekey)
* [`arpl account:list`](#arpl-accountlist)
* [`arpl account:lock ADDRESS`](#arpl-accountlock-address)
* [`arpl account:transactions ADDRESS`](#arpl-accounttransactions-address)
* [`arpl account:unlock ADDRESS`](#arpl-accountunlock-address)
* [`arpl block:follow`](#arpl-blockfollow)
* [`arpl block:get [NUMBER_OR_HASH]`](#arpl-blockget-number_or_hash)
* [`arpl help [COMMAND]`](#arpl-help-command)
* [`arpl peer:id`](#arpl-peerid)
* [`arpl raw COMMAND [OPTIONS]`](#arpl-raw-command-options)
* [`arpl repl`](#arpl-repl)
* [`arpl stake:add WALLET VALUE`](#arpl-stakeadd-wallet-value)
* [`arpl stake:get STAKER_ADDRESS`](#arpl-stakeget-staker_address)
* [`arpl stake:list`](#arpl-stakelist)
* [`arpl stake:move WALLET NEW_VALIDATOR_ADDRESS`](#arpl-stakemove-wallet-new_validator_address)
* [`arpl stake:recover WALLET VALUE`](#arpl-stakerecover-wallet-value)
* [`arpl stake:restart WALLET VALUE`](#arpl-stakerestart-wallet-value)
* [`arpl stake:start WALLET VALIDATOR_ADDRESS VALUE`](#arpl-stakestart-wallet-validator_address-value)
* [`arpl stake:stop WALLET VALUE`](#arpl-stakestop-wallet-value)
* [`arpl status`](#arpl-status)
* [`arpl transaction:get HASH`](#arpl-transactionget-hash)
* [`arpl transaction:send WALLET RECIPIENT VALUE`](#arpl-transactionsend-wallet-recipient-value)
* [`arpl validator:drop WALLET`](#arpl-validatordrop-wallet)
* [`arpl validator:get VALIDATOR_ADDRESS`](#arpl-validatorget-validator_address)
* [`arpl validator:new WALLET SIGNING_SECRET_KEY VOTING_SECRET_KEY`](#arpl-validatornew-wallet-signing_secret_key-voting_secret_key)
* [`arpl validator:reactivate WALLET VALIDATOR_ADDRESS SIGNING_SECRET_KEY`](#arpl-validatorreactivate-wallet-validator_address-signing_secret_key)
* [`arpl validator:retire WALLET VALIDATOR_ADDRESS SIGNING_SECRET_KEY`](#arpl-validatorretire-wallet-validator_address-signing_secret_key)
* [`arpl validator:unpark WALLET VALIDATOR_ADDRESS SIGNING_SECRET_KEY`](#arpl-validatorunpark-wallet-validator_address-signing_secret_key)
* [`arpl validator:update WALLET VALIDATOR_ADDRESS`](#arpl-validatorupdate-wallet-validator_address)

## `arpl account:create`

Create a new account in the node

```
USAGE
  $ arpl account:create

OPTIONS
  --password=password  Password to encrypt the key
  --unlock             Unlock the account after creation
```

_See code: [src/commands/account/create.ts](https://github.com/sisou/arpl/blob/v0.7.0/src/commands/account/create.ts)_

## `arpl account:get ADDRESS`

Show account information

```
USAGE
  $ arpl account:get ADDRESS

ARGUMENTS
  ADDRESS  Address of the account to display
```

_See code: [src/commands/account/get.ts](https://github.com/sisou/arpl/blob/v0.7.0/src/commands/account/get.ts)_

## `arpl account:import PRIVATEKEY`

Import an account by its private key

```
USAGE
  $ arpl account:import PRIVATEKEY

ARGUMENTS
  PRIVATEKEY  Private key in HEX or Base64 format

OPTIONS
  --password=password  Password to encrypt the key
  --unlock             Unlock the account after import
```

_See code: [src/commands/account/import.ts](https://github.com/sisou/arpl/blob/v0.7.0/src/commands/account/import.ts)_

## `arpl account:list`

List accounts available in node

```
USAGE
  $ arpl account:list
```

_See code: [src/commands/account/list.ts](https://github.com/sisou/arpl/blob/v0.7.0/src/commands/account/list.ts)_

## `arpl account:lock ADDRESS`

Lock an account

```
USAGE
  $ arpl account:lock ADDRESS

ARGUMENTS
  ADDRESS  Address of the account to lock
```

_See code: [src/commands/account/lock.ts](https://github.com/sisou/arpl/blob/v0.7.0/src/commands/account/lock.ts)_

## `arpl account:transactions ADDRESS`

List transactions for an address (newest first)

```
USAGE
  $ arpl account:transactions ADDRESS

ARGUMENTS
  ADDRESS  Address to display transactions for

OPTIONS
  -x, --extended          show extra columns
  --columns=columns       only show provided columns (comma-separated)
  --csv                   output is csv format [alias: --output=csv]
  --filter=filter         filter property by partial string matching, ex: name=foo
  --max=max               Max number of transactions to return
  --no-header             hide table header from output
  --no-truncate           do not truncate output to fit screen
  --output=csv|json|yaml  output in a more machine friendly format
  --sort=sort             property to sort by (prepend '-' for descending)

ALIASES
  $ arpl account:txs
```

_See code: [src/commands/account/transactions.ts](https://github.com/sisou/arpl/blob/v0.7.0/src/commands/account/transactions.ts)_

## `arpl account:unlock ADDRESS`

Unlock an account

```
USAGE
  $ arpl account:unlock ADDRESS

ARGUMENTS
  ADDRESS  Address of the account to unlock

OPTIONS
  --password=password  Password to decrypt the key
```

_See code: [src/commands/account/unlock.ts](https://github.com/sisou/arpl/blob/v0.7.0/src/commands/account/unlock.ts)_

## `arpl block:follow`

Stream blocks live

```
USAGE
  $ arpl block:follow
```

_See code: [src/commands/block/follow.ts](https://github.com/sisou/arpl/blob/v0.7.0/src/commands/block/follow.ts)_

## `arpl block:get [NUMBER_OR_HASH]`

Show block information

```
USAGE
  $ arpl block:get [NUMBER_OR_HASH]

ARGUMENTS
  NUMBER_OR_HASH  [default: latest] Block number or hash of the block to get

OPTIONS
  --full  Include block body (transactions, etc.)
```

_See code: [src/commands/block/get.ts](https://github.com/sisou/arpl/blob/v0.7.0/src/commands/block/get.ts)_

## `arpl help [COMMAND]`

display help for arpl

```
USAGE
  $ arpl help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `arpl peer:id`

Get the local peer ID of the node

```
USAGE
  $ arpl peer:id
```

_See code: [src/commands/peer/id.ts](https://github.com/sisou/arpl/blob/v0.7.0/src/commands/peer/id.ts)_

## `arpl raw COMMAND [OPTIONS]`

Run a raw Nimiq JSON-RPC command

```
USAGE
  $ arpl raw COMMAND [OPTIONS]
```

_See code: [src/commands/raw.ts](https://github.com/sisou/arpl/blob/v0.7.0/src/commands/raw.ts)_

## `arpl repl`

Open an interactive REPL session to run commands

```
USAGE
  $ arpl repl

EXAMPLE
  $ repl
```

_See code: [@sisou/oclif-plugin-repl](https://github.com/sisou/oclif-plugin-repl/blob/v0.3.1/src/commands/repl.ts)_

## `arpl stake:add WALLET VALUE`

Add stake to a staker

```
USAGE
  $ arpl stake:add WALLET VALUE

ARGUMENTS
  WALLET  Address of unlocked account to add stake from
  VALUE   NIM amount to add

OPTIONS
  --address=address                Staker address to add stake to (default: sender address)
  --dry                            Return serialized transaction without sending it
  --fee=fee                        Fee in Luna (default: 0)
  --validity-start=validity-start  [default: +0] Validity start height of the transaction

ALIASES
  $ arpl staker:stake
```

_See code: [src/commands/stake/add.ts](https://github.com/sisou/arpl/blob/v0.7.0/src/commands/stake/add.ts)_

## `arpl stake:get STAKER_ADDRESS`

Show information for a staker

```
USAGE
  $ arpl stake:get STAKER_ADDRESS

ARGUMENTS
  STAKER_ADDRESS  Address of staker to show information for

OPTIONS
  --plain  Display plain command output

ALIASES
  $ arpl staker:get
```

_See code: [src/commands/stake/get.ts](https://github.com/sisou/arpl/blob/v0.7.0/src/commands/stake/get.ts)_

## `arpl stake:list`

List validators and their stakes

```
USAGE
  $ arpl stake:list

OPTIONS
  --plain  Display plain command output
```

_See code: [src/commands/stake/list.ts](https://github.com/sisou/arpl/blob/v0.7.0/src/commands/stake/list.ts)_

## `arpl stake:move WALLET NEW_VALIDATOR_ADDRESS`

Move stake to another validator (update)

```
USAGE
  $ arpl stake:move WALLET NEW_VALIDATOR_ADDRESS

ARGUMENTS
  WALLET                 Address of unlocked account that owns the stake
  NEW_VALIDATOR_ADDRESS  Address of the validator to move stake to

OPTIONS
  --dry                            Return serialized transaction without sending it
  --fee=fee                        Fee in Luna (default: 0)
  --fee-wallet=fee-wallet          Address of unlocked account to pay the fee from (default: fee is paid from stake)
  --validity-start=validity-start  [default: +0] Validity start height of the transaction

ALIASES
  $ arpl staker:update
```

_See code: [src/commands/stake/move.ts](https://github.com/sisou/arpl/blob/v0.7.0/src/commands/stake/move.ts)_

## `arpl stake:recover WALLET VALUE`

Recover inactive stake to the account (unstake)

```
USAGE
  $ arpl stake:recover WALLET VALUE

ARGUMENTS
  WALLET  Address of unlocked account that owns the stake
  VALUE   NIM amount to recover

OPTIONS
  --dry                            Return serialized transaction without sending it
  --fee=fee                        Fee in Luna (default: 0)
  --recipient=recipient            Address to receive stake (default: WALLET)
  --validity-start=validity-start  [default: +0] Validity start height of the transaction

ALIASES
  $ arpl staker:unstake
```

_See code: [src/commands/stake/recover.ts](https://github.com/sisou/arpl/blob/v0.7.0/src/commands/stake/recover.ts)_

## `arpl stake:restart WALLET VALUE`

Restart staking (reactivate)

```
USAGE
  $ arpl stake:restart WALLET VALUE

ARGUMENTS
  WALLET  Address of unlocked account that owns the stake
  VALUE   NIM amount to stake

OPTIONS
  --dry                            Return serialized transaction without sending it
  --fee=fee                        Fee in Luna (default: 0)
  --fee-wallet=fee-wallet          Address of unlocked account to pay the fee from (default: fee is paid from stake)
  --validity-start=validity-start  [default: +0] Validity start height of the transaction

ALIASES
  $ arpl staker:reactivate
```

_See code: [src/commands/stake/restart.ts](https://github.com/sisou/arpl/blob/v0.7.0/src/commands/stake/restart.ts)_

## `arpl stake:start WALLET VALIDATOR_ADDRESS VALUE`

Start staking with a validator (new staker)

```
USAGE
  $ arpl stake:start WALLET VALIDATOR_ADDRESS VALUE

ARGUMENTS
  WALLET             Address of unlocked account to start staking from
  VALIDATOR_ADDRESS  Address of the validator to stake with
  VALUE              NIM amount to stake

OPTIONS
  --dry                            Return serialized transaction without sending it
  --fee=fee                        Fee in Luna (default: 0)
  --staker-wallet=staker-wallet    Address of unlocked staker account (default: WALLET)
  --validity-start=validity-start  [default: +0] Validity start height of the transaction

ALIASES
  $ arpl staker:new
```

_See code: [src/commands/stake/start.ts](https://github.com/sisou/arpl/blob/v0.7.0/src/commands/stake/start.ts)_

## `arpl stake:stop WALLET VALUE`

Stop staking (retire)

```
USAGE
  $ arpl stake:stop WALLET VALUE

ARGUMENTS
  WALLET  Address of unlocked account that owns the stake
  VALUE   NIM amount to retire

OPTIONS
  --dry                            Return serialized transaction without sending it
  --fee=fee                        Fee in Luna (default: 0)
  --fee-wallet=fee-wallet          Address of unlocked account to pay the fee from (default: fee is paid from stake)
  --validity-start=validity-start  [default: +0] Validity start height of the transaction

ALIASES
  $ arpl staker:retire
```

_See code: [src/commands/stake/stop.ts](https://github.com/sisou/arpl/blob/v0.7.0/src/commands/stake/stop.ts)_

## `arpl status`

Show the current status of the node

```
USAGE
  $ arpl status
```

_See code: [src/commands/status.ts](https://github.com/sisou/arpl/blob/v0.7.0/src/commands/status.ts)_

## `arpl transaction:get HASH`

Show transaction information

```
USAGE
  $ arpl transaction:get HASH

ARGUMENTS
  HASH  Transaction hash of the transaction to get

ALIASES
  $ arpl tx:get
```

_See code: [src/commands/transaction/get.ts](https://github.com/sisou/arpl/blob/v0.7.0/src/commands/transaction/get.ts)_

## `arpl transaction:send WALLET RECIPIENT VALUE`

Send a transaction

```
USAGE
  $ arpl transaction:send WALLET RECIPIENT VALUE

ARGUMENTS
  WALLET     Address of unlocked account to send transaction from
  RECIPIENT  Address of recipient
  VALUE      NIM amount to send

OPTIONS
  --dry                            Return serialized transaction without sending it
  --fee=fee                        Fee in Luna (default: 0)
  --validity-start=validity-start  [default: +0] Validity start height of the transaction

ALIASES
  $ arpl tx:send
```

_See code: [src/commands/transaction/send.ts](https://github.com/sisou/arpl/blob/v0.7.0/src/commands/transaction/send.ts)_

## `arpl validator:drop WALLET`

Drop an inactive validator

```
USAGE
  $ arpl validator:drop WALLET

ARGUMENTS
  WALLET  Address of unlocked account that owns the validator

OPTIONS
  --dry                            Return serialized transaction without sending it
  --fee=fee                        Fee in Luna (default: 0)
  --recipient=recipient            Address to receive validator deposit (default: sender address)
  --validity-start=validity-start  [default: +0] Validity start height of the transaction
```

_See code: [src/commands/validator/drop.ts](https://github.com/sisou/arpl/blob/v0.7.0/src/commands/validator/drop.ts)_

## `arpl validator:get VALIDATOR_ADDRESS`

Show information for a validator

```
USAGE
  $ arpl validator:get VALIDATOR_ADDRESS

ARGUMENTS
  VALIDATOR_ADDRESS  Address of validator to show information for

OPTIONS
  --plain    Display plain command output
  --stakers  Include a list of the validator's stakers
```

_See code: [src/commands/validator/get.ts](https://github.com/sisou/arpl/blob/v0.7.0/src/commands/validator/get.ts)_

## `arpl validator:new WALLET SIGNING_SECRET_KEY VOTING_SECRET_KEY`

Register a new validator (requires 10k NIM deposit)

```
USAGE
  $ arpl validator:new WALLET SIGNING_SECRET_KEY VOTING_SECRET_KEY

ARGUMENTS
  WALLET              Address of unlocked account to send transaction from (deposit and fees are taken from this
                      account)

  SIGNING_SECRET_KEY  Secret key used to sign Micro blocks and retire, reactivate & unpark transactions (default:
                      sending address)

  VOTING_SECRET_KEY   BLS secret key used when signing votes (for Macro blocks and view changes)

OPTIONS
  --dry                                  Return serialized transaction without sending it
  --fee=fee                              Fee in Luna (default: 0)
  --reward-address=reward-address        Reward address for the validator (default: sending address)
  --signal-data=signal-data              32-byte signal data (default: none)

  --validator-address=validator-address  Address of unlocked account that will own the validator (default: sending
                                         address)

  --validity-start=validity-start        [default: +0] Validity start height of the transaction
```

_See code: [src/commands/validator/new.ts](https://github.com/sisou/arpl/blob/v0.7.0/src/commands/validator/new.ts)_

## `arpl validator:reactivate WALLET VALIDATOR_ADDRESS SIGNING_SECRET_KEY`

Reactivate an inactive validator

```
USAGE
  $ arpl validator:reactivate WALLET VALIDATOR_ADDRESS SIGNING_SECRET_KEY

ARGUMENTS
  WALLET              Address of unlocked account to send transaction from (fees are taken from this account)
  VALIDATOR_ADDRESS   Address of the validator
  SIGNING_SECRET_KEY  Secret key used to sign the reactivate transaction

OPTIONS
  --dry                            Return serialized transaction without sending it
  --fee=fee                        Fee in Luna (default: 0)
  --validity-start=validity-start  [default: +0] Validity start height of the transaction
```

_See code: [src/commands/validator/reactivate.ts](https://github.com/sisou/arpl/blob/v0.7.0/src/commands/validator/reactivate.ts)_

## `arpl validator:retire WALLET VALIDATOR_ADDRESS SIGNING_SECRET_KEY`

Retire an active validator

```
USAGE
  $ arpl validator:retire WALLET VALIDATOR_ADDRESS SIGNING_SECRET_KEY

ARGUMENTS
  WALLET              Address of unlocked account to send transaction from (fees are taken from this account)
  VALIDATOR_ADDRESS   Address of the validator
  SIGNING_SECRET_KEY  Secret key used to sign the reactivate transaction

OPTIONS
  --dry                            Return serialized transaction without sending it
  --fee=fee                        Fee in Luna (default: 0)
  --validity-start=validity-start  [default: +0] Validity start height of the transaction
```

_See code: [src/commands/validator/retire.ts](https://github.com/sisou/arpl/blob/v0.7.0/src/commands/validator/retire.ts)_

## `arpl validator:unpark WALLET VALIDATOR_ADDRESS SIGNING_SECRET_KEY`

Unpark a parked validator

```
USAGE
  $ arpl validator:unpark WALLET VALIDATOR_ADDRESS SIGNING_SECRET_KEY

ARGUMENTS
  WALLET              Address of unlocked account to send transaction from (fees are taken from this account)
  VALIDATOR_ADDRESS   Address of the validator
  SIGNING_SECRET_KEY  Secret key used to sign the unpark transaction

OPTIONS
  --dry                            Return serialized transaction without sending it
  --fee=fee                        Fee in Luna (default: 0)
  --validity-start=validity-start  [default: +0] Validity start height of the transaction
```

_See code: [src/commands/validator/unpark.ts](https://github.com/sisou/arpl/blob/v0.7.0/src/commands/validator/unpark.ts)_

## `arpl validator:update WALLET VALIDATOR_ADDRESS`

Update reward address or secret key of a validator

```
USAGE
  $ arpl validator:update WALLET VALIDATOR_ADDRESS

ARGUMENTS
  WALLET             Address of unlocked account to send transaction from (fees are taken from this account)
  VALIDATOR_ADDRESS  Address of unlocked account that owns the validator

OPTIONS
  --dry                                    Return serialized transaction without sending it
  --fee=fee                                Fee in Luna (default: 0)
  --reward-address=reward-address          New reward address for the validator (default: no change)
  --signal-data=signal-data                New 32-byte signal data (default: no change)

  --signing-secret-key=signing-secret-key  New secret key used to sign Micro blocks and retire, reactivate & unpark
                                           transactions (default: no change)

  --validity-start=validity-start          [default: +0] Validity start height of the transaction

  --voting-secret-key=voting-secret-key    New BLS secret key used when signing votes (default: no change)
```

_See code: [src/commands/validator/update.ts](https://github.com/sisou/arpl/blob/v0.7.0/src/commands/validator/update.ts)_
<!-- commandsstop -->

@sisou/albatross-remote
=======================

Straight-forward remote management for Nimiq Albatross nodes

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@sisou/albatross-remote.svg)](https://npmjs.org/package/@sisou/albatross-remote)
[![Downloads/week](https://img.shields.io/npm/dw/@sisou/albatross-remote.svg)](https://npmjs.org/package/@sisou/albatross-remote)
[![License](https://img.shields.io/npm/l/@sisou/albatross-remote.svg)](https://github.com/sisou/albatross-remote/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @sisou/albatross-remote
$ arpl COMMAND
running command...
$ arpl (-v|--version|version)
@sisou/albatross-remote/0.0.1 linux-x64 node-v14.16.0
$ arpl --help [COMMAND]
USAGE
  $ arpl COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`arpl account:create`](#arpl-accountcreate)
* [`arpl account:get ADDRESS`](#arpl-accountget-address)
* [`arpl account:import PRIVATEKEY`](#arpl-accountimport-privatekey)
* [`arpl account:list`](#arpl-accountlist)
* [`arpl account:lock ADDRESS`](#arpl-accountlock-address)
* [`arpl account:unlock ADDRESS`](#arpl-accountunlock-address)
* [`arpl block:follow`](#arpl-blockfollow)
* [`arpl block:get NUMBER_OR_HASH`](#arpl-blockget-number_or_hash)
* [`arpl help [COMMAND]`](#arpl-help-command)
* [`arpl raw COMMAND [OPTIONS]`](#arpl-raw-command-options)
* [`arpl repl`](#arpl-repl)
* [`arpl stake:list`](#arpl-stakelist)
* [`arpl stake:move WALLET FROM_VALIDATOR_ID TO_VALIDATOR_ID VALUE`](#arpl-stakemove-wallet-from_validator_id-to_validator_id-value)
* [`arpl stake:recover WALLET VALUE`](#arpl-stakerecover-wallet-value)
* [`arpl stake:restart WALLET VALIDATOR_ID VALUE`](#arpl-stakerestart-wallet-validator_id-value)
* [`arpl stake:start WALLET VALIDATOR_ID VALUE`](#arpl-stakestart-wallet-validator_id-value)
* [`arpl stake:stop WALLET VALIDATOR_ID VALUE`](#arpl-stakestop-wallet-validator_id-value)
* [`arpl status`](#arpl-status)
* [`arpl transaction:get HASH`](#arpl-transactionget-hash)
* [`arpl transaction:send WALLET RECIPIENT VALUE`](#arpl-transactionsend-wallet-recipient-value)
* [`arpl validator:reactivate WALLET VALIDATOR_ID SECRET_KEY`](#arpl-validatorreactivate-wallet-validator_id-secret_key)
* [`arpl validator:unpark WALLET VALIDATOR_ID SECRET_KEY`](#arpl-validatorunpark-wallet-validator_id-secret_key)

## `arpl account:create`

Create a new account in the node

```
USAGE
  $ arpl account:create

OPTIONS
  --password=password  Password to encrypt the key
  --unlock             Unlock the account after creation
```

_See code: [src/commands/account/create.ts](https://github.com/sisou/albatross-remote/blob/v0.0.1/src/commands/account/create.ts)_

## `arpl account:get ADDRESS`

Show account information

```
USAGE
  $ arpl account:get ADDRESS

ARGUMENTS
  ADDRESS  Address of the account to display
```

_See code: [src/commands/account/get.ts](https://github.com/sisou/albatross-remote/blob/v0.0.1/src/commands/account/get.ts)_

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

_See code: [src/commands/account/import.ts](https://github.com/sisou/albatross-remote/blob/v0.0.1/src/commands/account/import.ts)_

## `arpl account:list`

List accounts available in node

```
USAGE
  $ arpl account:list
```

_See code: [src/commands/account/list.ts](https://github.com/sisou/albatross-remote/blob/v0.0.1/src/commands/account/list.ts)_

## `arpl account:lock ADDRESS`

Lock an account

```
USAGE
  $ arpl account:lock ADDRESS

ARGUMENTS
  ADDRESS  Address of the account to lock
```

_See code: [src/commands/account/lock.ts](https://github.com/sisou/albatross-remote/blob/v0.0.1/src/commands/account/lock.ts)_

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

_See code: [src/commands/account/unlock.ts](https://github.com/sisou/albatross-remote/blob/v0.0.1/src/commands/account/unlock.ts)_

## `arpl block:follow`

Stream blocks live

```
USAGE
  $ arpl block:follow
```

_See code: [src/commands/block/follow.ts](https://github.com/sisou/albatross-remote/blob/v0.0.1/src/commands/block/follow.ts)_

## `arpl block:get NUMBER_OR_HASH`

Show block information

```
USAGE
  $ arpl block:get NUMBER_OR_HASH

ARGUMENTS
  NUMBER_OR_HASH  Block number or hash of the block to get

OPTIONS
  --full  Include block body in information (transactions, etc.)
```

_See code: [src/commands/block/get.ts](https://github.com/sisou/albatross-remote/blob/v0.0.1/src/commands/block/get.ts)_

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

## `arpl raw COMMAND [OPTIONS]`

Run a raw Nimiq JSON-RPC command

```
USAGE
  $ arpl raw COMMAND [OPTIONS]
```

_See code: [src/commands/raw.ts](https://github.com/sisou/albatross-remote/blob/v0.0.1/src/commands/raw.ts)_

## `arpl repl`

Open an interactive REPL session to run commands

```
USAGE
  $ arpl repl

EXAMPLE
  $ repl
```

_See code: [@sisou/oclif-plugin-repl](https://github.com/sisou/oclif-plugin-repl/blob/v0.3.1/src/commands/repl.ts)_

## `arpl stake:list`

List validators and stakes

```
USAGE
  $ arpl stake:list
```

_See code: [src/commands/stake/list.ts](https://github.com/sisou/albatross-remote/blob/v0.0.1/src/commands/stake/list.ts)_

## `arpl stake:move WALLET FROM_VALIDATOR_ID TO_VALIDATOR_ID VALUE`

Move stake between validators (rededicate)

```
USAGE
  $ arpl stake:move WALLET FROM_VALIDATOR_ID TO_VALIDATOR_ID VALUE

ARGUMENTS
  WALLET             Address of unlocked account that owns the stake
  FROM_VALIDATOR_ID  ID of the validator to move stake from
  TO_VALIDATOR_ID    ID of the validator to move stake to
  VALUE              [NIM] Staking amount to move

OPTIONS
  --dry                            Return serialized transaction without sending it
  --fee=fee                        Fee in Luna (default: 0)
  --validity-start=validity-start  Validity start height of the transaction (default: latest)
```

_See code: [src/commands/stake/move.ts](https://github.com/sisou/albatross-remote/blob/v0.0.1/src/commands/stake/move.ts)_

## `arpl stake:recover WALLET VALUE`

Recover stopped stake to the account (unstake)

```
USAGE
  $ arpl stake:recover WALLET VALUE

ARGUMENTS
  WALLET  Address of unlocked account that owns the stake
  VALUE   NIM amount to recover

OPTIONS
  --dry                            Return serialized transaction without sending it
  --fee=fee                        Fee in Luna (default: 0)
  --validity-start=validity-start  Validity start height of the transaction (default: latest)
```

_See code: [src/commands/stake/recover.ts](https://github.com/sisou/albatross-remote/blob/v0.0.1/src/commands/stake/recover.ts)_

## `arpl stake:restart WALLET VALIDATOR_ID VALUE`

Restart staking with a validator (reactivate)

```
USAGE
  $ arpl stake:restart WALLET VALIDATOR_ID VALUE

ARGUMENTS
  WALLET        Address of unlocked account to restart staking with
  VALIDATOR_ID  ID of the validator to stake with
  VALUE         NIM amount to stake

OPTIONS
  --dry                            Return serialized transaction without sending it
  --fee=fee                        Fee in Luna (default: 0)
  --validity-start=validity-start  Validity start height of the transaction (default: latest)
```

_See code: [src/commands/stake/restart.ts](https://github.com/sisou/albatross-remote/blob/v0.0.1/src/commands/stake/restart.ts)_

## `arpl stake:start WALLET VALIDATOR_ID VALUE`

Start staking with a validator (stake)

```
USAGE
  $ arpl stake:start WALLET VALIDATOR_ID VALUE

ARGUMENTS
  WALLET        Address of unlocked account to start staking with
  VALIDATOR_ID  ID of the validator to stake with
  VALUE         NIM amount to stake

OPTIONS
  --dry                            Return serialized transaction without sending it
  --fee=fee                        Fee in Luna (default: 0)
  --validity-start=validity-start  Validity start height of the transaction (default: latest)
```

_See code: [src/commands/stake/start.ts](https://github.com/sisou/albatross-remote/blob/v0.0.1/src/commands/stake/start.ts)_

## `arpl stake:stop WALLET VALIDATOR_ID VALUE`

Stop staking with a validator (retire)

```
USAGE
  $ arpl stake:stop WALLET VALIDATOR_ID VALUE

ARGUMENTS
  WALLET        Address of unlocked account that owns the stake
  VALIDATOR_ID  ID of the validator to stop staking with
  VALUE         NIM amount to retire

OPTIONS
  --dry                            Return serialized transaction without sending it
  --fee=fee                        Fee in Luna (default: 0)
  --validity-start=validity-start  Validity start height of the transaction (default: latest)
```

_See code: [src/commands/stake/stop.ts](https://github.com/sisou/albatross-remote/blob/v0.0.1/src/commands/stake/stop.ts)_

## `arpl status`

Show the current status of the node

```
USAGE
  $ arpl status
```

_See code: [src/commands/status.ts](https://github.com/sisou/albatross-remote/blob/v0.0.1/src/commands/status.ts)_

## `arpl transaction:get HASH`

Show transaction information

```
USAGE
  $ arpl transaction:get HASH

ARGUMENTS
  HASH  Transaction hash of the transaction to get
```

_See code: [src/commands/transaction/get.ts](https://github.com/sisou/albatross-remote/blob/v0.0.1/src/commands/transaction/get.ts)_

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
  --validity-start=validity-start  Validity start height of the transaction (default: latest)
```

_See code: [src/commands/transaction/send.ts](https://github.com/sisou/albatross-remote/blob/v0.0.1/src/commands/transaction/send.ts)_

## `arpl validator:reactivate WALLET VALIDATOR_ID SECRET_KEY`

Send a validator reactivation transaction

```
USAGE
  $ arpl validator:reactivate WALLET VALIDATOR_ID SECRET_KEY

ARGUMENTS
  WALLET        Address of unlocked account to send transaction from
  VALIDATOR_ID  ID of the validator to reactivate
  SECRET_KEY    Secret key of the validator to reactivate

OPTIONS
  --dry                            Return serialized transaction without sending it
  --fee=fee                        Fee in Luna (default: 0)
  --validity-start=validity-start  Validity start height of the transaction (default: latest)
```

_See code: [src/commands/validator/reactivate.ts](https://github.com/sisou/albatross-remote/blob/v0.0.1/src/commands/validator/reactivate.ts)_

## `arpl validator:unpark WALLET VALIDATOR_ID SECRET_KEY`

Send a validator unparking transaction

```
USAGE
  $ arpl validator:unpark WALLET VALIDATOR_ID SECRET_KEY

ARGUMENTS
  WALLET        Address of unlocked account to send transaction from
  VALIDATOR_ID  ID of the validator to unpark
  SECRET_KEY    Secret key of the validator to unpark

OPTIONS
  --dry                            Return serialized transaction without sending it
  --fee=fee                        Fee in Luna (default: 0)
  --validity-start=validity-start  Validity start height of the transaction (default: latest)
```

_See code: [src/commands/validator/unpark.ts](https://github.com/sisou/albatross-remote/blob/v0.0.1/src/commands/validator/unpark.ts)_
<!-- commandsstop -->

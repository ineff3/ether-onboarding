# 🤖 Smart Contracts

## Install dependencies:
```shell
  pnpm install
  forge soldeer install
```

**Note:**: If `forge` complains about missing `soldeer` command upgrade `forge` to the latest version.

```shell
  foundryup
```

## Run [tests](https://book.getfoundry.sh/reference/forge/forge-test):
```shell
  forge test
```
(available as `pnpm` script as well)

Run in watch mode:
```shell
  forge test --watch
```

## Linter:
```shell
  pnpm lint
```
or with fix
```shell
  pnpm lint:fix
```

## Build:
```shell
  forge build
```
(available as `pnpm` script as well)

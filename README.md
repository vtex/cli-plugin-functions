# VTEX CLI Plugin Template

Extend the `vtex` toolbelt!

## Developing

1. Run `yarn link` on this project.
1. Clone `vtex/toolbelt` and follow the steps on the Contributing section.
1. Now run `yarn link @vtex/cli-plugin-functions` (or the new name) on the `vtex/toolbelt` project.
1. Run `yarn watch` on the `vtex/toolbelt`
1. Test the command on a Gatsby store with `vtex-test functions`

The Gatsby store should have a directory `api` containing functions. You can
use this project as an example:
[vtex-site/storefaas.store](https://github.com/vtex-sites/storefaas.store).

For more information, read [Ocliff Docs](https://oclif.io/docs/introduction).

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
![npm](https://img.shields.io/npm/v/@vtex/cli-plugin-template)

<!-- toc -->
* [VTEX CLI Plugin Template](#vtex-cli-plugin-template)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @vtex/cli-plugin-functions
$ vtex COMMAND
running command...
$ vtex (-v|--version|version)
@vtex/cli-plugin-functions/0.0.0 linux-x64 node-v12.20.1
$ vtex --help [COMMAND]
USAGE
  $ vtex COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`vtex functions`](#vtex-functions)
* [`vtex functions:deploy`](#vtex-functionsdeploy)
* [`vtex functions:dev`](#vtex-functionsdev)

## `vtex functions`

StoreFramework serverless functions

```
USAGE
  $ vtex functions

EXAMPLE
  $ vtex-test functions
```

_See code: [build/commands/functions/index.ts](https://github.com/vtex/cli-plugin-template/blob/v0.0.0/build/commands/functions/index.ts)_

## `vtex functions:deploy`

upload serverless functions to the cloud

```
USAGE
  $ vtex functions:deploy

EXAMPLE
  $ vtex-test functions deploy
```

_See code: [build/commands/functions/deploy.ts](https://github.com/vtex/cli-plugin-template/blob/v0.0.0/build/commands/functions/deploy.ts)_

## `vtex functions:dev`

run a local server to test serverless functions

```
USAGE
  $ vtex functions:dev

OPTIONS
  -h, --help     show CLI help
  -v, --verbose  Show debug level logs
  --trace        Ensure all requests to VTEX IO are traced

EXAMPLE
  $ vtex-test functions dev
```

_See code: [build/commands/functions/dev.ts](https://github.com/vtex/cli-plugin-template/blob/v0.0.0/build/commands/functions/dev.ts)_
<!-- commandsstop -->

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
@vtex/cli-plugin-functions/1.0.0 linux-x64 node-v12.22.1
$ vtex --help [COMMAND]
USAGE
  $ vtex COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`vtex sfj`](#vtex-sfj)
* [`vtex sfj:start`](#vtex-sfjstart)

## `vtex sfj`

StoreFramework serverless functions

```
USAGE
  $ vtex sfj

EXAMPLE
  $ vtex-test sfj start
```

_See code: [build/commands/sfj/index.ts](https://github.com/vtex/cli-plugin-template/blob/v1.0.0/build/commands/sfj/index.ts)_

## `vtex sfj:start`

run a local server to develop with serverless functions

```
USAGE
  $ vtex sfj:start

OPTIONS
  -h, --help     show CLI help
  -v, --verbose  Show debug level logs
  --trace        Ensure all requests to VTEX IO are traced

EXAMPLE
  $ vtex functions
```

_See code: [build/commands/sfj/start.ts](https://github.com/vtex/cli-plugin-template/blob/v1.0.0/build/commands/sfj/start.ts)_
<!-- commandsstop -->

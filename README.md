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
$ npm install -g @vtex/cli-plugin-template
$ vtex COMMAND
running command...
$ vtex (-v|--version|version)
@vtex/cli-plugin-template/0.0.0 linux-x64 node-v12.18.4
$ vtex --help [COMMAND]
USAGE
  $ vtex COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`vtex functions`](#vtex-hello-file)

## `vtex functions`

describe the command here

```
USAGE
  $ vtex functions

EXAMPLE
  $ oclif-example functions
```

_See code: [build/commands/functions.ts](https://github.com/vtex/cli-plugin-functions/master/src/commands/functions.ts)_
<!-- commandsstop -->

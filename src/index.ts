// @ts-check
import yargs from 'yargs';
import build from './build';
import commitMsg from './commit-msg';
import init from './init';
import lint from './lint';
import {
  BuildOptions,
  CommitMsgOptions,
  InitOptions,
  PreCommitOptions,
  TestOptions,
  LintOptions,
} from './types';
import preCommit from './pre-commit';
import test from './test';

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
yargs
  .scriptName('scripts')
  .usage('$0 <cmd> [args]')
  .command<BuildOptions>('build', 'build the package', {}, argv => build(argv))
  .command<CommitMsgOptions>(
    'commit-msg',
    'git hook for validating commit messages',
    {},
    argv => commitMsg(argv),
  )
  .command<InitOptions>(
    'init <name>',
    'init a new package',
    yargs =>
      yargs
        .positional('name', {
          type: 'string',
          describe: 'the name of the package to init',
        })
        .option('user', {
          type: 'string',
          alias: 'u',
          demandOption: true,
          describe: 'github username',
        })
        .option('repo', {
          type: 'string',
          alias: 'r',
          demandOption: true,
          describe: 'github repository name',
        }),
    argv => init(argv),
  )
  .command<LintOptions>('lint', 'lint the package', {}, argv => lint(argv))
  .command<PreCommitOptions>('pre-commit', 'pre-commit hook', {}, argv =>
    preCommit(argv),
  )
  .command<TestOptions>('test', 'test the package', {}, argv => test(argv))
  .demandCommand()
  .strict()
  .help().argv;

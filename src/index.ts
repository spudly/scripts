// @ts-check
import yargs from 'yargs';
import build from './commands/build';
import commitMsg from './commands/commit-msg';
import init from './commands/init';
import lint from './commands/lint';
import preCommit from './commands/pre-commit';
import test from './commands/test';
import {
  BuildOptions,
  CommitMsgOptions,
  InitOptions,
  PreCommitOptions,
  TestOptions,
  LintOptions,
} from './types';

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

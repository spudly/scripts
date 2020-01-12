// @ts-check
import yargs from 'yargs';

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
yargs
  .scriptName('scripts')
  .usage('$0 <cmd> [args]')
  .command(require('./init'))
  .command(require('./build'))
  .command(require('./lint'))
  .command(require('./test'))
  .command(require('./pre-commit'))
  .command(require('./commit-msg'))
  .demandCommand()
  .strict()
  .help().argv;

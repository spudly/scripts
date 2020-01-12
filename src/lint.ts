import {CommandModule} from 'yargs';
import {LintOptions} from './types';
import {spawnSync} from 'child_process';

const lint = (_opts: LintOptions) => {
  spawnSync('npx', ['eslint', '.', '--ext', '.js,.jsx,.ts,.tsx'], {
    cwd: process.cwd(),
    stdio: 'inherit',
  });
};

module.exports = {
  command: 'lint',
  describe: 'lint the package',
  builder: {},
  handler: argv => lint(argv),
} as CommandModule<LintOptions, LintOptions>;

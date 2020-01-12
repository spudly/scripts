import {CommandModule} from 'yargs';
import {BuildOptions} from './types';
import {spawnSync} from 'child_process';

const build = (_opts: BuildOptions) => {
  spawnSync('npx', ['tsc'], {
    cwd: process.cwd(),
    stdio: 'inherit',
  });
};

module.exports = {
  command: 'build',
  describe: 'build the package',
  builder: {},
  handler: argv => build(argv),
} as CommandModule<BuildOptions, BuildOptions>;

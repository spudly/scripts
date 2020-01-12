import {CommandModule} from 'yargs';
import {TestOptions} from './types';
import {spawnSync} from 'child_process';

const test = (_opts: TestOptions) => {
  spawnSync('npx', ['jest'], {
    cwd: process.cwd(),
    stdio: 'inherit',
  });
};

module.exports = {
  command: 'test',
  describe: 'test the package',
  builder: {},
  handler: argv => test(argv),
} as CommandModule<TestOptions, TestOptions>;

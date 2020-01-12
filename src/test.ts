import {TestOptions} from './types';
import {spawnSync} from 'child_process';

const test = (_opts: TestOptions) => {
  spawnSync('npx', ['jest'], {
    cwd: process.cwd(),
    stdio: 'inherit',
  });
};

export default test;

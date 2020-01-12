import {BuildOptions} from './types';
import {spawnSync} from 'child_process';

const build = (_opts: BuildOptions) => {
  spawnSync('npx', ['tsc'], {
    cwd: process.cwd(),
    stdio: 'inherit',
  });
};

export default build;

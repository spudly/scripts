import {BuildOptions} from '../types';
import {spawnSync} from 'child_process';

const build = (cwd: string, _opts: BuildOptions) => {
  spawnSync('npx', ['tsc'], {
    cwd,
    stdio: 'inherit',
  });
};

export default build;

import {BuildOptions} from '../types';
import {spawnSync} from 'child_process';

const build = (cwd: string, _opts: BuildOptions) => {
  spawnSync('npx', ['tsc', '-p', 'tsconfig.build.cjs.json'], {
    cwd,
    stdio: 'inherit',
  });
  spawnSync('npx', ['tsc', '-p', 'tsconfig.build.esm.json'], {
    cwd,
    stdio: 'inherit',
  });
};

export default build;

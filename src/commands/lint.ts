import {LintOptions} from '../types';
import {spawnSync} from 'child_process';

const lint = (_opts: LintOptions) => {
  spawnSync('npx', ['eslint', '.', '--ext', '.js,.jsx,.ts,.tsx'], {
    cwd: process.cwd(),
    stdio: 'inherit',
  });
};

export default lint;

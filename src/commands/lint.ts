import {LintOptions} from '../types';
import {spawnSync} from 'child_process';

const lint = (cwd: string, _opts: LintOptions) => {
  spawnSync('npx', ['eslint', '.', '--ext', '.js,.jsx,.ts,.tsx'], {
    cwd,
    stdio: 'inherit',
  });
};

export default lint;

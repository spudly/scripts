import {InitOptions} from '../types';
import copyFilesRecursive from '../utils/copyFilesRecursive';
import ejs from 'ejs';
import {spawnSync} from 'child_process';
import {resolve} from 'path';

const init = (cwd: string, opts: InitOptions) => {
  copyFilesRecursive(
    resolve(__dirname, '../../template'),
    cwd,
    (fileContents: string) => ejs.render(fileContents, opts),
  );
  spawnSync(
    'npm',
    [
      'install',
      '--save-dev',
      '@spudly/scripts',
      '@types/jest',
      '@types/node',
      'husky',
    ],
    {cwd, stdio: 'inherit'},
  );
};

export default init;

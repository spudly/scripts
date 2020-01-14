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
    'npm install',
    [
      '--save-dev',
      '@commitlint/cli',
      '@commitlint/config-conventional',
      '@semantic-release/changelog',
      '@semantic-release/git',
      '@spudly/eslint-config',
      '@spudly/scripts',
      '@types/jest',
      '@types/node',
      'eslint',
      'husky',
      'jest',
      'lint-staged',
      'prettier',
      'semantic-release',
      'sort-package-json',
      'ts-jest',
      'typescript',
    ],
    {cwd, stdio: 'inherit'},
  );
};

export default init;

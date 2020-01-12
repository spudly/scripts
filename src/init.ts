import {InitOptions} from './types';
import {copyFilesRecursive} from './utils';
import ejs from 'ejs';
import {spawnSync} from 'child_process';
import {resolve} from 'path';

const init = (opts: InitOptions) => {
  copyFilesRecursive(
    resolve(__dirname, '../../template'),
    process.cwd(),
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
    {cwd: process.cwd(), stdio: 'inherit'},
  );
};

export default init;

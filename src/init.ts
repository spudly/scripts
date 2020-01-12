import {CommandModule} from 'yargs';
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

module.exports = {
  command: 'init <name>',
  describe: 'init a new package',
  builder: yargs => {
    return yargs
      .positional('name', {
        type: 'string',
        describe: 'the name of the package to init',
      })
      .option('user', {
        type: 'string',
        alias: 'u',
        demandOption: true,
        describe: 'github username',
      })
      .option('repo', {
        type: 'string',
        alias: 'r',
        demandOption: true,
        describe: 'github repository name',
      });
  },
  handler: argv => init(argv),
} as CommandModule<InitOptions, InitOptions>;

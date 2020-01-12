import {CommandModule} from 'yargs';
// @ts-ignore
import lintStaged from 'lint-staged';
import {PreCommitOptions} from './types';

const test = (_opts: PreCommitOptions) => {
  lintStaged({
    config: {
      'package.json': ['sort-package-json', 'prettier --write', 'git add'],
      '*.{js,jsx,ts,tsx}': [
        'eslint --fix',
        'jest --bail --findRelatedTests',
        'prettier --write',
        'git add',
      ],
      '*.{json,md,htm,html,css}': ['prettier --write', 'git add'],
    },
  }).catch((error: Error) => {
    console.error(error.stack);
    process.exitCode = 1;
  });
};

module.exports = {
  command: 'pre-commit',
  describe: 'pre-commit hook',
  builder: {},
  handler: argv => test(argv),
} as CommandModule<PreCommitOptions, PreCommitOptions>;

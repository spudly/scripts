import lintStaged from 'lint-staged';
import {PreCommitOptions} from '../types';
import getJestConfig from '../utils/getJestConfig';

const preCommit = (_opts: PreCommitOptions) => {
  const jestConfig = JSON.stringify(getJestConfig());
  lintStaged({
    config: {
      'package.json': ['sort-package-json', 'prettier --write', 'git add'],
      '*.{js,jsx,ts,tsx}': [
        'eslint --fix',
        `jest --bail --findRelatedTests --config ${jestConfig}`,
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

export default preCommit;

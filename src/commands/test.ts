import {TestOptions} from '../types';
import jest from 'jest';
import getJestConfig from '../utils/getJestConfig';

const test = (_opts: TestOptions) => {
  process.env.BABEL_ENV = 'test';
  process.env.NODE_ENV = 'test';

  const args: Array<string> = []; // TODO: allow user to pass args
  if (
    !process.env.CI &&
    !args.includes('--watchAll') &&
    !args.includes('--watchAll=false')
  ) {
    args.push('--watch');
  }

  args.push('--config', JSON.stringify(getJestConfig()));

  jest.run(args);
};

export default test;

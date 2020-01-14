import {TestOptions} from '../types';
import jest from 'jest';
import getJestConfig from '../utils/getJestConfig';
import yargs from 'yargs';

const test = (opts: yargs.Arguments<TestOptions>) => {
  process.env.BABEL_ENV = 'test';
  process.env.NODE_ENV = 'test';

  const jestArgs = process.argv.slice(process.argv.indexOf('test') + 1);

  if (
    !process.env.CI &&
    !jestArgs.includes('--watchAll') &&
    !jestArgs.includes('--watchAll=false')
  ) {
    jestArgs.push('--watch');
  }

  jestArgs.push('--config', JSON.stringify(getJestConfig()));

  console.log(jestArgs.join(' '));

  jest.run(jestArgs);
};

export default test;

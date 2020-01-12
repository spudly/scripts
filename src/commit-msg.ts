import {CommitMsgOptions} from './types';
import {readFileSync} from 'fs';
import lint from '@commitlint/lint';
import load, {Seed} from '@commitlint/load';
import chalk from 'chalk';

const seed: Seed = {
  extends: ['@commitlint/config-conventional'],
};

const commitMsg = (_opts: CommitMsgOptions) => {
  const message = readFileSync(process.env.HUSKY_GIT_PARAMS as string, 'utf-8');
  load(seed)
    .then(opts =>
      lint(
        message,
        opts.rules,
        opts.parserPreset ? {parserOpts: opts.parserPreset.opts} : {},
      ),
    )
    .then(({valid, errors, warnings}) => {
      warnings.forEach(warning =>
        console.log(chalk.yellow(`[${warning.name}] ${warning.message}`)),
      );
      errors.forEach(error =>
        console.log(chalk.red(`[${error.name}] ${error.message}`)),
      );
      if (!valid) {
        process.exitCode = 1;
      }
    });
};

export default commitMsg;

import {readFileSync, writeFileSync, mkdirSync} from 'fs';
import {dirname} from 'path';

const copyFile = (
  from: string,
  to: string,
  transform: (contents: string) => string,
) => {
  try {
    mkdirSync(dirname(to), {recursive: true});
    writeFileSync(to, transform(readFileSync(from, 'utf-8')));
  } catch (error) {
    console.log(`The following error occurred while copying ${from} to ${to}.`);
    throw error;
  }
};

export default copyFile;

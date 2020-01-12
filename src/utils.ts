import {
  readFileSync,
  writeFileSync,
  readdirSync,
  statSync,
  mkdirSync,
} from 'fs';
import {dirname} from 'path';

export const copyFile = (
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

export const copyFilesRecursive = (
  from: string,
  to: string,
  transform: (contents: string) => string = s => s,
) => {
  const files = readdirSync(from);
  files.forEach(name => {
    if (statSync(`${from}/${name}`).isDirectory()) {
      copyFilesRecursive(`${from}/${name}`, `${to}/${name}`, transform);
    } else {
      copyFile(`${from}/${name}`, `${to}/${name}`, transform);
    }
  });
};

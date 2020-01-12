import {readdirSync, statSync} from 'fs';
import copyFile from './copyFile';

const copyFilesRecursive = (
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

export default copyFilesRecursive;

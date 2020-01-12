import {
  readFileSync,
  writeFileSync,
  existsSync,
  readdirSync,
  statSync,
  mkdirSync,
} from 'fs';
import {dirname} from 'path';
import deepmerge from 'deepmerge';
import {execSync} from 'child_process';

export const readJson = (file: string) =>
  JSON.parse(readFileSync(file, 'utf8'));

export const readPackageJson = (dir: string) => {
  try {
    return readJson(`${dir}/package.json`);
  } catch (error) {
    throw new Error(
      'Missing package.json file! Are you running this in a subfolder?',
    );
  }
};

export const getGithubInfo = (root: string) => {
  const stdout = execSync(`git config --get remote.origin.url`, {
    cwd: root,
    encoding: 'utf-8',
  });
  const match = stdout.match(/github\.com:(.+)\/(.+)\.git/);
  return {user: match?.[1], repo: match?.[2]};
};

export const writeJson = (file: string, data: any) =>
  writeFileSync(file, JSON.stringify(data, null, 2));

export const mergeDeep = <T extends {[key: string]: any}>(
  ...args: Array<T>
): T =>
  deepmerge.all(args, {
    // don't merge arrays. overwrite them.
    arrayMerge: (_, newArray) => newArray,
  }) as T;

export const hasPackageJson = (dir: string) =>
  existsSync(`${dir}/package.json`);

export const unique = <T>(array: Array<T>) => [...new Set(array)];

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

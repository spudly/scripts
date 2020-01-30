declare module 'lint-staged' {
  export default function lintStaged(arg: {
    config: {
      [key: string]: Array<string>;
    };
  }): Promise<void>;
}

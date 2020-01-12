declare module 'lint-staged' {
  type Config = {
    [key: string]: Array<string>;
  };
  type Options = {
    config: Config;
  };
  const lintStaged: (options: Options) => Promise<void>;
  export default lintStaged;
}

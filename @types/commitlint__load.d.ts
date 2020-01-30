declare module '@commitlint/load' {
  /**
   * How to handle violation of rule
   * 0 - ignore
   * 1 - warn
   * 2 - throw
   */
  export type RuleLevel = 0 | 1 | 2;

  /*
   * Application of rule
   * always - positive
   * never - negative
   */
  export type RuleCondition = 'always' | 'never';

  /*
   * Additional, optional options to pass to rule
   */
  export type RuleOption = any;

  /**
   * Basic complete rule definition
   */
  export type PrimitiveRule = [RuleLevel, RuleCondition, RuleOption?];

  /*
   * Async rules are resolved during config lookup.
   * They can be used to set up linting rules based on e.g. the project fs
   */
  export type AsyncRule = Promise<PrimitiveRule>;

  /*
   * Function rules are executed during config lookup.
   * They can be used to set up linting rules based on e.g. the project fs
   */
  export type FunctionRule = () => PrimitiveRule;

  /*
   * Async function rules are executed and awaited during config lookup.
   * They can be used to set up linting rules based on e.g. the project fs
   */
  export type AsyncFunctionRule = () => Promise<PrimitiveRule>;

  /*
   * Polymorphic rule struct
   */
  export type Rule = PrimitiveRule | FunctionRule | AsyncFunctionRule;

  /*
   * Parser preset for conventional commits
   */
  export type ParserPreset = {
    name: string;
    path: string;
    opts: any;
  };

  export type Seed = {
    /*
     * ids resolveable from cwd or configuration file.
     * Imported and merged into configuration
     * with increasing precedence, with top level config taking the highest.
     */
    extends?: string[];
    /*
     * id resolveable from cwd or configuration file.
     * Imported and expanded to {ParserPreset}.
     * Top level parserPresets override presets in extended configuration.
     */
    parserPreset?: string;
    /**
     * Initial map of rules to check against
     */
    rules?: {[ruleName: string]: Rule};
  };

  export type Config = {
    /*
     * Relatives path to all extendend configurations.
     */
    extends: string[];
    /*
     * Expanded parser preset, if any
     */
    parserPreset?: ParserPreset;
    /*
     * Merged map of rules to check against
     */
    rules: {[ruleName: string]: Rule};
  };

  export type LoadOptions = {
    /*
     * Path to the config file to load.
     */
    file?: string;
    /*
     * The cwd to use when loading config from file parameter.
     */
    cwd: string;
  };

  export default function load(
    seed?: Seed,
    options?: LoadOptions,
  ): Promise<Config>;
}

declare module '@commitlint/load' {
  export type RuleLevel = 0 | 1 | 2;
  export type RuleCondition = 'always' | 'never';
  export type RuleOption = any;
  export type PrimitiveRule = [RuleLevel, RuleCondition, RuleOption?];
  export type AsyncRule = Promise<PrimitiveRule>;
  export type FunctionRule = () => PrimitiveRule;
  export type AsyncFunctionRule = () => Promise<PrimitiveRule>;
  export type Rule = PrimitiveRule | FunctionRule | AsyncFunctionRule;

  export type ParserPreset = {
    name: string;
    path: string;
    opts: any;
  };
  export type Seed = {
    extends?: string[];
    parserPreset?: string;
    rules?: {[ruleName: string]: Rule};
  };
  export type Config = {
    extends: string[];
    parserPreset?: ParserPreset;
    rules: {[ruleName: string]: Rule};
  };
  const load: (seed?: Seed) => Promise<Config>;
  export default load;
}

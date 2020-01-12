declare module '@commitlint/lint' {
  type RuleLevel = 0 | 1 | 2;
  type RuleCondition = 'always' | 'never';
  type RuleOption = any;
  type PrimitiveRule = [RuleLevel, RuleCondition, RuleOption?];
  type AsyncRule = Promise<PrimitiveRule>;
  type FunctionRule = () => PrimitiveRule;
  type AsyncFunctionRule = () => Promise<PrimitiveRule>;
  type Rule = PrimitiveRule | FunctionRule | AsyncFunctionRule;

  export type Problem = {
    level: number;
    valid: boolean;
    name: string;
    message: string;
  };

  export type Report = {
    valid: boolean;
    errors: Problem[];
    warnings: Problem[];
  };

  export type Options = {
    parserOpts?: any;
  };

  const lint: (
    message: string,
    rules: {[ruleName: string]: Rule},
    opts?: Options,
  ) => Promise<Report>;
  export default lint;
}

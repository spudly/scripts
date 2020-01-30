declare module '@commitlint/lint' {
  export type RuleLevel = 0 | 1 | 2;
  export type RuleCondition = 'always' | 'never';
  export type RuleOption = any;
  export type PrimitiveRule = [RuleLevel, RuleCondition, RuleOption?];
  export type AsyncRule = Promise<PrimitiveRule>;
  export type FunctionRule = () => PrimitiveRule;
  export type AsyncFunctionRule = () => Promise<PrimitiveRule>;
  export type Rule = PrimitiveRule | FunctionRule | AsyncFunctionRule;

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

  export default function lint(
    message: string,
    rules: {[ruleName: string]: Rule},
    opts?: Options,
  ): Promise<Report>;
}

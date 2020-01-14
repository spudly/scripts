export type InitOptions = {
  name: string;
  webpack: boolean;
  repoUser: string;
  repoName: string;
};

export type BuildOptions = {};
export type LintOptions = {};
export type TestOptions = {
  _: Array<string>;
};
export type PreCommitOptions = {};
export type CommitMsgOptions = {};

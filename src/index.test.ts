import run from '.';
import tmp, {DirResult} from 'tmp';
import fs from 'fs';
import {readFileSync} from 'fs';
import {execSync} from 'child_process';

const tmpObjs: Array<DirResult> = [];

const setup = () => {
  const tmpObj = tmp.dirSync();
  const dir = tmpObj.name;
  tmpObjs.push(tmpObj);
  return dir;
};

afterEach(() => {
  let o;
  while ((o = tmpObjs.shift())) {
    o.removeCallback();
  }
});

describe('init', () => {
  let dir: string;
  beforeAll(() => {
    dir = setup();
    run(dir, ['init', 'foo', '--user=chuck', '--repo=norris']);
  });

  test('package.json', () => {
    expect(JSON.parse(readFileSync(`${dir}/package.json`, 'utf8')))
      .toMatchInlineSnapshot(`
      Object {
        "devDependencies": Object {
          "@spudly/scripts": "^1.0.2",
          "@types/jest": "^25.1.1",
          "@types/node": "^13.5.2",
          "husky": "^4.2.1",
        },
        "eslintConfig": Object {
          "extends": "@spudly",
        },
        "eslintIgnore": Array [
          "node_modules",
          "build",
        ],
        "files": Array [
          "bin",
          "build",
        ],
        "husky": Object {
          "hooks": Object {
            "commit-msg": Array [
              "spudly-scripts commit-msg",
            ],
            "pre-commit": Array [
              "spudly-scripts pre-commit",
            ],
          },
        },
        "main": "build/cjs/index.js",
        "module": "build/esm/index.js",
        "name": "foo",
        "prettier": Object {
          "bracketSpacing": false,
          "endOfLine": "lf",
          "proseWrap": "always",
          "singleQuote": true,
          "trailingComma": "all",
        },
        "publishConfig": Object {
          "access": "public",
        },
        "scripts": Object {
          "build": "spudly-scripts build",
          "lint": "spudly-scripts lint",
          "prepare": "npm run build",
          "test": "spudly-scripts test",
        },
        "version": "0.0.0",
      }
    `);
  });

  test('tsconfig.json', () => {
    expect(readFileSync(`${dir}/tsconfig.json`, 'utf8')).toMatchInlineSnapshot(`
      "{
        \\"include\\": [\\"src/**/*\\", \\"@types/**/*\\"],
        \\"compilerOptions\\": {
          \\"allowJs\\": true,
          \\"esModuleInterop\\": true,
          \\"module\\": \\"commonjs\\",
          \\"moduleResolution\\": \\"node\\",
          \\"outDir\\": \\"build\\",
          \\"rootDir\\": \\"src\\",
          \\"strict\\": true,
          \\"target\\": \\"esnext\\",
          \\"noEmit\\": true
        }
      }
      "
    `);
  });

  test('license', () => {
    expect(readFileSync(`${dir}/LICENSE.md`, 'utf8')).toMatchInlineSnapshot(`
      "ISC License (ISC) Copyright (c) 2020 Contributors

      Permission to use, copy, modify, and/or distribute this software for any purpose
      with or without fee is hereby granted, provided that the above copyright notice
      and this permission notice appear in all copies.

      THE SOFTWARE IS PROVIDED \\"AS IS\\" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
      REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
      FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
      INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
      OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
      TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
      THIS SOFTWARE.
      "
    `);
  });

  test('contributing', () => {
    expect(readFileSync(`${dir}/CONTRIBUTING.md`, 'utf8'))
      .toMatchInlineSnapshot(`
      "# Contributing

      Thank you for your interest in contributing to this project. All contributions
      are welcome and appreciated including code, documentation, answers to questions,
      etc.

      ## Helpful Links

      - [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)
      - [foo](https://github.com/chuck/norris)
      - [all-contributors](https://github.com/all-contributors/all-contributors)
      "
    `);
  });

  test('github workflow', () => {
    expect(readFileSync(`${dir}/.github/workflows/workflow.yml`, 'utf8'))
      .toMatchInlineSnapshot(`
      "name: build

      on: [push]

      jobs:
        test:
          runs-on: ubuntu-latest
          strategy:
            matrix:
              node-version: [10.x, 12.x]
          env:
            CI: true
          steps:
            - name: checkout
              uses: actions/checkout@v1
            - name: setup node \${{matrix.node-version }}
              uses: actions/setup-node@v1
              with:
                node-version: \${{ matrix.node-version }}
            - name: install
              run: npm ci
            - name: build
              run: npm build
            - name: lint
              run: npm run lint
            - name: test
              run: npm test -- --coverage
            - name: codecov
              uses: codecov/codecov-action@v1
              with:
                token: \${{ secrets.CODECOV_TOKEN }}
                fail_ci_if_error: true

        release:
          needs: test
          runs-on: ubuntu-latest
          env:
            CI: true
          steps:
            - name: checkout
              uses: actions/checkout@v1
            - name: setup node
              uses: actions/setup-node@v1
              with:
                node-version: 12
                registry-url: https://registry.npmjs.org/
            - name: install
              run: npm ci
            - name: release
              env:
                GITHUB_TOKEN: \${{ secrets.GH_TOKEN }}
                NODE_AUTH_TOKEN: \${{ secrets.NPM_TOKEN }}  
              run: npx semantic-release"
    `);
  });

  test('code of conduct', () => {
    expect(readFileSync(`${dir}/CODE_OF_CONDUCT.md`, 'utf8'))
      .toMatchInlineSnapshot(`
      "# Contributor Covenant Code of Conduct

      ## Our Pledge

      We as members, contributors, and leaders pledge to make participation in our
      community a harassment-free experience for everyone, regardless of age, body
      size, visible or invisible disability, ethnicity, sex characteristics, gender
      identity and expression, level of experience, education, socio-economic status,
      nationality, personal appearance, race, religion, or sexual identity and
      orientation.

      We pledge to act and interact in ways that contribute to an open, welcoming,
      diverse, inclusive, and healthy community.

      ## Our Standards

      Examples of behavior that contributes to a positive environment for our
      community include:

      - Demonstrating empathy and kindness toward other people
      - Being respectful of differing opinions, viewpoints, and experiences
      - Giving and gracefully accepting constructive feedback
      - Accepting responsibility and apologizing to those affected by our mistakes,
        and learning from the experience
      - Focusing on what is best not just for us as individuals, but for the overall
        community

      Examples of unacceptable behavior include:

      - The use of sexualized language or imagery, and sexual attention or advances of
        any kind
      - Trolling, insulting or derogatory comments, and personal or political attacks
      - Public or private harassment
      - Publishing others' private information, such as a physical or email address,
        without their explicit permission
      - Other conduct which could reasonably be considered inappropriate in a
        professional setting

      ## Enforcement Responsibilities

      Community leaders are responsible for clarifying and enforcing our standards of
      acceptable behavior and will take appropriate and fair corrective action in
      response to any behavior that they deem inappropriate, threatening, offensive,
      or harmful.

      Community leaders have the right and responsibility to remove, edit, or reject
      comments, commits, code, wiki edits, issues, and other contributions that are
      not aligned to this Code of Conduct, and will communicate reasons for moderation
      decisions when appropriate.

      ## Scope

      This Code of Conduct applies within all community spaces, and also applies when
      an individual is officially representing the community in public spaces.
      Examples of representing our community include using an official e-mail address,
      posting via an official social media account, or acting as an appointed
      representative at an online or offline event.

      ## Enforcement

      Instances of abusive, harassing, or otherwise unacceptable behavior may be
      reported to the community leaders responsible for enforcement at [INSERT CONTACT
      METHOD]. All complaints will be reviewed and investigated promptly and fairly.

      All community leaders are obligated to respect the privacy and security of the
      reporter of any incident.

      ## Enforcement Guidelines

      Community leaders will follow these Community Impact Guidelines in determining
      the consequences for any action they deem in violation of this Code of Conduct:

      ### 1. Correction

      **Community Impact**: Use of inappropriate language or other behavior deemed
      unprofessional or unwelcome in the community.

      **Consequence**: A private, written warning from community leaders, providing
      clarity around the nature of the violation and an explanation of why the
      behavior was inappropriate. A public apology may be requested.

      ### 2. Warning

      **Community Impact**: A violation through a single incident or series of
      actions.

      **Consequence**: A warning with consequences for continued behavior. No
      interaction with the people involved, including unsolicited interaction with
      those enforcing the Code of Conduct, for a specified period of time. This
      includes avoiding interactions in community spaces as well as external channels
      like social media. Violating these terms may lead to a temporary or permanent
      ban.

      ### 3. Temporary Ban

      **Community Impact**: A serious violation of community standards, including
      sustained inappropriate behavior.

      **Consequence**: A temporary ban from any sort of interaction or public
      communication with the community for a specified period of time. No public or
      private interaction with the people involved, including unsolicited interaction
      with those enforcing the Code of Conduct, is allowed during this period.
      Violating these terms may lead to a permanent ban.

      ### 4. Permanent Ban

      **Community Impact**: Demonstrating a pattern of violation of community
      standards, including sustained inappropriate behavior, harassment of an
      individual, or aggression toward or disparagement of classes of individuals.

      **Consequence**: A permanent ban from any sort of public interaction within the
      project community.

      ## Attribution

      This Code of Conduct is adapted from the [Contributor Covenant][homepage],
      version 2.0, available at
      https://www.contributor-covenant.org/version/2/0/code_of_conduct.html.

      Community Impact Guidelines were inspired by
      [Mozilla's code of conduct enforcement ladder](https://github.com/mozilla/diversity).

      [homepage]: https://www.contributor-covenant.org

      For answers to common questions about this code of conduct, see the FAQ at
      https://www.contributor-covenant.org/faq. Translations are available at
      https://www.contributor-covenant.org/translations.
      "
    `);
  });

  test('readme', () => {
    expect(readFileSync(`${dir}/README.md`, 'utf8')).toMatchInlineSnapshot(`
      "# foo

      <!-- prettier-ignore-start -->

      ![GitHub Workflow Status](https://img.shields.io/github/workflow/status/chuck/norris/build?style=flat-square)
      [![Codecov](https://img.shields.io/codecov/c/github/chuck/norris?style=flat-square)](https://codecov.io/gh/chuck/norris)
      [![version](https://img.shields.io/npm/v/foo.svg?style=flat-square)](https://www.npmjs.com/package/foo)
      [![downloads](https://img.shields.io/npm/dm/foo.svg?style=flat-square)](http://www.npmtrends.com/foo)
      [![NPM](https://img.shields.io/npm/l/foo?style=flat-square)](https://github.com/chuck/norris/blob/master/LICENSE.md)

      [![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
      ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)
      [![Code of Conduct](https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square)](https://github.com/chuck/norris/blob/master/CODE_OF_CONDUCT.md)

      [![Watch on GitHub](https://img.shields.io/github/watchers/chuck/norris.svg?style=social)](https://github.com/chuck/norris/watchers)
      [![Star on GitHub](https://img.shields.io/github/stars/chuck/norris.svg?style=social)](https://github.com/chuck/norris/stargazers)
      [![Tweet](https://img.shields.io/twitter/url/https/github.com/chuck/norris.svg?style=social)](https://twitter.com/intent/tweet?text=Check%20out%20norris%20https%3A%2F%2Fgithub.com%2Fchuck%2Fnorris)

        <!-- prettier-ignore-end -->

      ## Features

      <span style=\\"color: red\\">TODO: write this secion</span>

      ## Installation

      \`\`\`bash
      npm install --save foo
      \`\`\`

      <span style=\\"color: red\\">TODO: write this secion</span>

      ## Usage

      <span style=\\"color: red\\">TODO: write this secion</span>

      ## Contributors

        <!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
        <!-- ALL-CONTRIBUTORS-LIST:END -->

      This project follows the
      [all-contributors](https://github.com/all-contributors/all-contributors)
      specification. Contributions of any kind welcome!
      "
    `);
  });
});

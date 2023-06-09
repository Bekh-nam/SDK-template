# Contribution Guidelines for Typescript SDK

- Coding Styles
  - File names must use Snake case. For example, `prediction.ts` .
  - Class names must use Pascal case. For example, `class AuthenticationKey` .
  - Function and method names must use Camel case. For example, `createEvent` .
  - Constants must use all caps (upper case) words separated by `_`. For example, `MAX_U32` .
- Comments
  - Comments are required for new classes and functions.
  - Comments should follow the TSDoc standard, [https://tsdoc.org/](https://tsdoc.org/).
- Lints and Formats
  - ESlint (eslint) and Prettier (prettier) should be used for code checking and code formatting. Make sure to run `pnpm lint` and `pnpm fmt` after making changes to the code.
- Tests
  - Unit tests are required for any non-trivial changes you make.
  - The Jest testing framework is used in the repo and we recommend you use it. See Jest: [https://jestjs.io/](https://jestjs.io/).
  - Make sure to run `pnpm test` after making changes.
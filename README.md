# SDK for Prediction protocol

[![NPM Package Version][npm-image-version]][npm-url]
[![NPM Package Downloads][npm-image-downloads]][npm-url]

## Quickstart

The public SDK for prediction protocol integration.

```bash
npm build
```

## Usage

For Javascript or Typescript usage, check out the [`./examples`][examples] folder with ready-made `package.json` files to get you going quickly!

If you are using the types in a `commonjs` module, like in a Node app, you just have to enable `esModuleInterop`
and `allowSyntheticDefaultImports` in your `tsconfig` for types compatibility:

```json
{
  ...
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true
    ...
  }
}
```

### Requirements

- [Node.js](https://nodejs.org)
- [Yarn](https://pnpmpkg.com/)

```bash
pnpm install
```

**NOTE**

Package the SDK and start building:

```bash
pnpm build
pnpm pack
# In your project directory
pnpm add PATH_TO_LOCAL_SDK_PACKAGE
```

## Semantic versioning

This project follows [semver](https://semver.org/) as closely as possible.

## Release process

To release a new version of the SDK do the following.

1. Check that the commit you're deploying from (likely just the latest commit of `main`) is green ln CI. Go to GitHub and make sure there is a green tick, specifically for the `sdk-release` release CI step. This ensures that the all tests, formatters, and linters passed, including server / client compatibility tests (within that commit) and tests to ensure the API, API spec, and client were all generated and match up.
2. Bump the version in `package.json` according to [semver](https://semver.org/).
3. Add an entry in the CHANGELOG for the version. We adhere to [Keep a Changelog](https://keepachangelog.com/en/1.0.0/). Generally this means changing the "Unreleased" section to a version and then making a new "Unreleased" section.
4. Once you're confident everything is correct, submit your PR. The CI will ensure that you have followed all the previous steps, specifically ensuring that the API, API spec, and SDK client are all compatible, that you've updated the changelog, that the tests pass, etc.
5. Land the PR into the main branch. Make sure this commit comes up green in CI too.
6. Check out the latest commit on main.
7. Get the auth token from our password manager. Search for "npmjs". It should look like similar to this: `npm_cccaCVg0bWaaR741D5Gdsd12T4JpQre444aaaa`.
8. Run `pnpm publish --dry-run`. From here, make some sanity checks:
    a. Look closely at the output of the command. {ay close attention to what is packaged. Make sure we're not including some files that were included accidentally. For example `.aptos`. Add those to .npmignore if needed.
    b. Compare the summary with the public npm package summary on npmjs. The number of files and sizes should not vary too much.
9. Run `NODE_AUTH_TOKEN=<token> pnpm checked-publish`
10. Double check that the release worked by visitng npmjs: https://www.npmjs.com/package/prediction-aptos-sdk


[examples]: https://github.com/Bekh-nam/SDK-template.git
[repo]: https://github.com/Bekh-nam/SDK-template
[npm-image-version]: https://img.shields.io/npm/v/aptos.svg
[npm-image-downloads]: https://img.shields.io/npm/dm/aptos.svg
[npm-url]: https://npmjs.org/package/prediction-aptos-sdk

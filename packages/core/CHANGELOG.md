# Changelog

## v2.0.0

### ⚠️ Breaking Changes

- **Renamed singleton:** `SimplyBuilderCore` → `SBCoreCore` — all external references must use the new name
- **Development change:** Code written in TS under `src`, generates `JS` on build in `audit` before merging/minifying to `lib`, with `d.ts` generation directly into `lib`
- **Moved directory:** `core-module/` → `packages/core/`

### 🚀 Enhancements

- Build with rollup + terser (ecma: 2020)
- Immutable frozen singleton

### ❤️ Contributors

- JamilServices <jamilservicos@gmail.com>

## v1.1.0

[compare changes](https://github.com/SimplyBuilder/sb-core/compare/v0.0.12...v1.1.0)

### 🩹 Fixes

- Also check core module in event-module/src/store.js ([26f14b2](https://github.com/SimplyBuilder/sb-core/commit/26f14b2))

### 💅 Refactors

- **core-module:** Remove unnecessary code from root/chore ([d9ee1c2](https://github.com/SimplyBuilder/sb-core/commit/d9ee1c2))

### ❤️ Contributors

- JamilServices <jamilservicos@gmail.com>

## v1.0.8

[compare changes](https://github.com/SimplyBuilder/sb-core/compare/v0.0.11...v1.0.8)

### 💅 Refactors

- **core-module:** Remove unnecessary code from root/core-module ([146cdce](https://github.com/SimplyBuilder/sb-core/commit/146cdce))

### 🏡 Chore

- Update publish:modules script in package.json ([de8925a](https://github.com/SimplyBuilder/sb-core/commit/de8925a))
- Fix publish:modules script to include --no-git-checks flag ([3235723](https://github.com/SimplyBuilder/sb-core/commit/3235723))

### ❤️ Contributors

- JamilServices <jamilservicos@gmail.com>

## v1.0.7

[compare changes](https://github.com/SimplyBuilder/sb-core/compare/v0.0.10...v1.0.7)

### 🚀 Enhancements

- **dom-module:** Add SimplyBuilderAttachShadow function ([b6f75c0](https://github.com/SimplyBuilder/sb-core/commit/b6f75c0))
- **core-module:** Remove unnecessary import ([bcf11d1](https://github.com/SimplyBuilder/sb-core/commit/bcf11d1))

### 💅 Refactors

- **core-module:** Remove redundant code for attaching shadow roots ([532d56f](https://github.com/SimplyBuilder/sb-core/commit/532d56f))

### ❤️ Contributors

- JamilServices <jamilservicos@gmail.com>

## v1.0.6

[compare changes](https://github.com/SimplyBuilder/sb-core/compare/v0.0.9...v1.0.6)

## v1.0.5

[compare changes](https://github.com/SimplyBuilder/sb-core/compare/v0.0.8...v1.0.5)

### 🚀 Enhancements

- **core-module:** Add test for creating duplicate elements ([bd40be1](https://github.com/SimplyBuilder/sb-core/commit/bd40be1))

### 🩹 Fixes

- Fix conditional statement in buildElement function ([3e6dad2](https://github.com/SimplyBuilder/sb-core/commit/3e6dad2))

### ❤️ Contributors

- JamilServices <jamilservicos@gmail.com>

## v1.0.4

[compare changes](https://github.com/SimplyBuilder/sb-core/compare/v0.0.6...v1.0.4)

### 💅 Refactors

- **dom-module:** Update createHTMLElement function to pass DomStore to buildElement function ([66a64e9](https://github.com/SimplyBuilder/sb-core/commit/66a64e9))

### ❤️ Contributors

- JamilServices <jamilservicos@gmail.com>

## v1.0.3

[compare changes](https://github.com/SimplyBuilder/sb-core/compare/v0.0.5...v1.0.3)

### 🚀 Enhancements

- **core-module:** Add event handling functions ([b04ef10](https://github.com/SimplyBuilder/sb-core/commit/b04ef10))
- **core-module:** Add eventRegister and eventUnregister methods ([d1bd906](https://github.com/SimplyBuilder/sb-core/commit/d1bd906))
- Add eventRegister and eventUnregister functions to CoreModule ([2f476b0](https://github.com/SimplyBuilder/sb-core/commit/2f476b0))

### ❤️ Contributors

- JamilServices <jamilservicos@gmail.com>

## v1.0.2

[compare changes](https://github.com/SimplyBuilder/sb-core/compare/v0.0.3...v1.0.2)

### 💅 Refactors

- **README.md:** Update README.md with new contribution guidelines for Core, Dom, and Event Modules ([e5f1485](https://github.com/SimplyBuilder/sb-core/commit/e5f1485))

### ❤️ Contributors

- JamilServices <jamilservicos@gmail.com>

## v1.0.1

[compare changes](https://github.com/SimplyBuilder/sb-core/compare/empty...v1.0.1)

### 🚀 Enhancements

- Add initial project structure and ignore files ([56aa2d1](https://github.com/SimplyBuilder/sb-core/commit/56aa2d1))
- Add AUTHORS file ([49d4330](https://github.com/SimplyBuilder/sb-core/commit/49d4330))
- Add CONTRIBUTING.md with guidelines for contributing to `sb-core` ([e3df30d](https://github.com/SimplyBuilder/sb-core/commit/e3df30d))
- Add GOVERNANCE.md file with project governance details ([a1fd532](https://github.com/SimplyBuilder/sb-core/commit/a1fd532))
- Add MIT License ([9f18a8e](https://github.com/SimplyBuilder/sb-core/commit/9f18a8e))
- Add pnpm workspace configuration ([8658a8a](https://github.com/SimplyBuilder/sb-core/commit/8658a8a))
- Add package.json with initial project configuration ([356eea2](https://github.com/SimplyBuilder/sb-core/commit/356eea2))
- Add security policy for reporting vulnerabilities ([a6ee5ce](https://github.com/SimplyBuilder/sb-core/commit/a6ee5ce))
- Add release changelog configuration ([37b566c](https://github.com/SimplyBuilder/sb-core/commit/37b566c))
- Add funding model platforms to FUNDING.yml ([b7c5d2b](https://github.com/SimplyBuilder/sb-core/commit/b7c5d2b))
- Add GitHub Actions workflow for npm package publishing ([fbaa524](https://github.com/SimplyBuilder/sb-core/commit/fbaa524))
- Add MAINTAINERS.md file ([740722c](https://github.com/SimplyBuilder/sb-core/commit/740722c))
- Add 'core-module' to pnpm-workspace.yaml ([055d5e4](https://github.com/SimplyBuilder/sb-core/commit/055d5e4))
- Add "core-module" to workspaces in package.json ([94cd897](https://github.com/SimplyBuilder/sb-core/commit/94cd897))
- Add core-module/ to .gitignore ([f22c5c1](https://github.com/SimplyBuilder/sb-core/commit/f22c5c1))
- Add CoreModule type definition ([468e89d](https://github.com/SimplyBuilder/sb-core/commit/468e89d))
- **core-module:** Add tsconfig.json ([992b3b7](https://github.com/SimplyBuilder/sb-core/commit/992b3b7))
- **core-module:** Add rollup configuration for CoreModule ([db3f6d0](https://github.com/SimplyBuilder/sb-core/commit/db3f6d0))
- Add README file for core-module ([e955591](https://github.com/SimplyBuilder/sb-core/commit/e955591))
- **core-module:** Add core module package.json configuration ([25406f4](https://github.com/SimplyBuilder/sb-core/commit/25406f4))
- Add core-module MAINTAINERS.md file ([8ee4cb0](https://github.com/SimplyBuilder/sb-core/commit/8ee4cb0))
- Add MIT License to core-module/LICENSE ([298abd9](https://github.com/SimplyBuilder/sb-core/commit/298abd9))
- **core-module:** Add GOVERNANCE.md file 📜 ([162320a](https://github.com/SimplyBuilder/sb-core/commit/162320a))
- **core-module:** Add CONTRIBUTING.md file ([9399695](https://github.com/SimplyBuilder/sb-core/commit/9399695))
- **core-module:** Add AUTHORS file with Jamil Services emails ([6ff134b](https://github.com/SimplyBuilder/sb-core/commit/6ff134b))
- Add .npmignore file 📦 ([536bdc5](https://github.com/SimplyBuilder/sb-core/commit/536bdc5))
- **core-module:** Add initial .gitignore configuration ([60c68e0](https://github.com/SimplyBuilder/sb-core/commit/60c68e0))
- **core-module/tests:** Add initial tests for CoreModule ([8336662](https://github.com/SimplyBuilder/sb-core/commit/8336662))
- **core-module:** Add main module file ([3d45054](https://github.com/SimplyBuilder/sb-core/commit/3d45054))
- Add new feature to SimplyBuilderCore - Add createHTMLElement method to SimplyBuilderCore - Add getVersion method to SimplyBuilderCore - Add onReady callback to SimplyBuilderCore ([092783e](https://github.com/SimplyBuilder/sb-core/commit/092783e))
- Update SimplyBuilderCore - Add createSVGElement method - Add formatVersion method - Add createTextNode method - Add createFromStruct method - Add buildElement method - Add setData method - Add removeElement method - Add DomStore and EventModule integration ([0930a56](https://github.com/SimplyBuilder/sb-core/commit/0930a56))
- Add shadow dom support for SimplyBuilderCore - Add attachShadow method to SimplyBuilderCore ([1131461](https://github.com/SimplyBuilder/sb-core/commit/1131461))

### 🩹 Fixes

- Fix missing newline at end of file in event-module/tests/index.js ([491dad6](https://github.com/SimplyBuilder/sb-core/commit/491dad6))
- **dom-module:** Fix import path for EventModule in index test - Adjusted import path for EventModule in index test to correct src directory. ([dd91387](https://github.com/SimplyBuilder/sb-core/commit/dd91387))

### 💅 Refactors

- Add: create .npmignore file to ignore all files in npm package ([3a5e2ac](https://github.com/SimplyBuilder/sb-core/commit/3a5e2ac))

### 📦 Build

- Add GitHub Actions workflow for testing and publishing Node.js package ([8c983b5](https://github.com/SimplyBuilder/sb-core/commit/8c983b5))

### 🏡 Chore

- Re-order workspaces in package.json ([09ce51a](https://github.com/SimplyBuilder/sb-core/commit/09ce51a))
- Update npm publish script to publish:modules ([89522b2](https://github.com/SimplyBuilder/sb-core/commit/89522b2))

### ❤️ Contributors

- JamilServices <jamilservicos@gmail.com>

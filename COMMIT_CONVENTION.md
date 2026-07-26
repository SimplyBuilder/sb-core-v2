# Commit Convention

Unique commit standard for the entire **SimplyBuilder** ecosystem.

## Format

```
(<gitmoji> )?<type>(<scope>)?(!)?: <description>

<optional body>
```

### General Rules

- **Language:** English
- **First line:** maximum **74 characters**
- **Description:** simple present, imperative ("add" not "added", "fix" not "fixed")
- **Optional body:** wrap at 74 characters, explain the "why" and "how"

## Gitmoji → Type

| Gitmoji | Type | Usage |
|---------|------|-------|
| `:sparkles:` | `feat` | New feature |
| `:hammer:` | `fix` | Bug fix |
| `:adhesive_bandage:` | `fix` | Hotfix / quick fix |
| `:recycle:` | `refactor` | Refactor without behavior change |
| `:wrench:` | `chore` | Maintenance, scripts, internal tasks |
| `:books:` | `docs` | Documentation |
| `:art:` | `style` | Formatting, code style (no logic change) |
| `:rocket:` | `perf` | Performance |
| `:construction_worker:` | `ci` | CI/CD |
| `:building_construction:` | `build` | Build system or external dependencies |
| `:white_check_mark:` | `test` | Tests |
| `:pushpin:` | `revert` | Revert a previous commit |

## Scope (Escopo)

Optional. Indicates the affected module or package:

```
feat(core): add shadow DOM support
fix(event): fix nested listener cleanup
```

Common scopes in the ecosystem: `core`, `dom`, `event`, `reactive`, `router`, `notify`, `crypto`, `docs`, `ci`, `deps`

## Breaking Changes

Add `!` before the colon:

```
feat(core)!: change createFromStruct signature
```

In the body, include `BREAKING CHANGE:` with the migration description:

```
BREAKING CHANGE: The `struct` parameter is now required.
```

## Examples

```
:sparkles: feat(core): add SVG element support
```

```
:hammer: fix(dom): fix listener removal in nested elements
```

```
:recycle: refactor(event): extract version validation to separate function
```

```
:white_check_mark: test(event): add tests for eventId removal
```

```
:wrench: chore: update rollup to v4
```

```
:books: docs(architecture): add COMMIT_CONVENTION.md
```

```
:construction_worker: ci: add automatic publish workflow
```

```
:rocket: perf(core): replace Object.assign with spread operator
```

## Validation (WebStorm)

The regex below is used by the WebStorm checker and must validate **all** commits:

```
^((:pushpin:|:hammer:|:sparkles:|:adhesive_bandage:|:wrench:|:books:|:art:|:rocket:|:construction_worker:|:building_construction:|:white_check_mark:)\s)?(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test)(\([\w\-\.]+\))?(!)?: ([\w \-]+)([\s\S]*)
```

## History

| Date | Change |
|------|--------|
| 2026-07-12 | Document created
| 2026-07-25 | Translated to English |

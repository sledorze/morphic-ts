# Changelog

> **Tags:**
>
> - [New Feature]
> - [Bug Fix]
> - [Breaking Change]
> - [Documentation]
> - [Internal]
> - [Polish]
> - [Experimental]

**Note**: Gaps between patch versions are faulty/broken releases. **Note**: A feature tagged as Experimental is in a
high state of flux, you're at risk of it changing without notice.

## 0.8.0-rc.0

- Breaking Change

  - New MorphADT encoding enabling selectMorph / excludeMorph which both support correct (re)derivation

## 0.7.0

- New Feature

  - New version 0.7.0

## 0.7.0-RC10

- New Feature

  - Interpreter constraints

## 0.7.0-RC9

- New Feature

  - provides function to help with configuration specification.
  - Eq for unknown is configurable (using fast-equals as default)

## 0.7.0-RC8

- New Feature

  - refined Algebra and implementations

## 0.7.0-RC7

- New Feature

  - newtype Algebra and implementations

## 0.7.0-RC6

- New Feature

  - unknown Algebra and implementations

## 0.7.0-RC5

- Breaking Change

  - Simplify API Surface for better DX

## 0.7.0-RC4

- New Feature

  - better startup DX - exports AsOpaque and AsUOpaque from interpreters

## 0.7.0-RC3

- Breaking Change

  - Only keep kind2 variant of io-ts interpreters

## 0.7.0-RC2

- New Feature

  - makeTagged works with both inferrerd and non inferred Morphs

## 0.7.0-RC1

- New Feature

  - Default batteries interpreters use Kind2 io-ts definitions

## 0.7.0-RC0

- Breaking Change

  - Fix inference usage (interface augmentation was breaking due to path containing 'src' - was backtracking too much)

## 0.6.3

- Breaking Change

  - Fix unmatching interface extension

## 0.6.2

- Breaking Change

  - Work around type 'erasure'

## 0.6.1

- New Feature

  - Gives the ability to extend an Algebra
  - Rename io-ts-string to io-ts-2

- Breaking Change

  - Inference scheme

## 0.5.0

- Breaking Change

  - New encoding, may break your code if you used advanced
  - Lighter inference with better opacity
  - Config needs to use interpreter Symbol to provide customizations

## 0.4.1

- Bug Fix

  - Fix inference

## 0.4.0

- Breaking Change

  - Rename ADTExt to MorphADT
  - Ergonomic changes for composing MorphADT without relying on `program` member

- Internal

  - removed some type casting

## 0.3.19

- New Feature

  - add configuration for iots interpreter of primitives algebra

## 0.3.18

- New Feature

  - add optional name (IOTS) to 'keyOf' to ease with long Union names

## 0.3.17

- New Feature

  - add names (IOTS) for interface related types to follow Typescript Opacity

## 0.3.16

- New Feature

  - support to implement interpreter specific Configs

## 0.3.15

- New Feature

  - unionADT supports several ADTs

## 0.3.14

- Bug Fix

  - Fix imports

## 0.3.13

- Bug Fix

  - Fix export (use function and not const)

## 0.3.12

- Bug Fix

  - `program` exposed via `tagged` was not callable

- New Feature

  - `tagged-union` ADT builder
  - expose ADTExt

## 0.3.11

- Bug Fix

  - Reducer return initialState if called with an unknown action with an undefined state

## 0.3.10

- New Feature

  - `is`, `as` and `of` use members and not string tag to identity ADT
  - expose `keys` and `tag` in ADT (Experimental, may revise that)
  - Reducer filters non conforming ADTs
  - Add verified
  - updated `unionADT`, `intersectionADT`, `select` and `exclude` accordingly

## 0.3.9

- Fix explicit type param specialization (use `function` instead of `const` functions)

## 0.3.8

- Breaking Change

  - JSONSchema report errors

- New Feature

  - Add `summon` (temporary name) ni order to ease DX

## 0.3.7

- Breaking Change

  - Use `HKT2` type in place of custom `M`
  - Change encoding of Algebra to help with custom setup (shorter, easier, safer)

## 0.3.6

- Polish

  - Reexport URI from interpreters

## 0.3.5

- Breaking Change

  - Change Reducer signature to match Redux one

## 0.3.4

- New Feature

  - Add `transform` a partial matcher acting as an Endomorphism

## 0.3.3

- New Feature

  - Default case expose the `action` in matchers (and reducers)

## 0.3.2

- New Feature

  - `createReducer` on `Matchers` interface (so indirectly available on `ADT`s)

## 0.3.1

- New Feature

  - `default` optional clause for `match` and `matchWiden`
  - Type level `CtorType` and `ADTType`
  - Add some tests for `cacheUnaryFunction`

- Bug Fix

  - Correct order of overload for `prismFromPredicate`

- Breaking Change
  - (Internal) rename `cacheByKey` to `cacheUnaryFunction`

## 0.3.0

- New Feature

  - add isAnyOf
  - add unionADT and intersectionADT

- Breaking Change

  - Move adt to its own space
  - Builder is dumb again

- Polish
  - 'isA' renamed to 'is'

## 0.2.0

- Breaking Change

  - Remove variants in favor of type union narrowing

- Polish
  - Lot of renaming and API changes in order to reduce boilerplate

## 0.1.1

- New Feature

  - add byTagAll (@sledorze)
  - add assignFunction (@sledorze)

- Polish
  - import URI with interpreter signature (@sledorze)
  - correctly narrow variance of Variants

## 0.1.0

Initial release

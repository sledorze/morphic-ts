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

## 0.3.10

- New Feature

  - is, as and of use members and not string tag to identity ADT
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

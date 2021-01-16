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
> - [Deprecation]

## 3.0.0-alpha.7

- **New Feature**
  - `Intersection` can be configured
  - `Interface`, `Partial`, `Both` can be configured
  - `Newtype`  can be configured
  - added `NewtypeIso`, `NewtypePrism` (which can be configured)
  - `Refine`  can be configured
  - added `Constrained` (which can be configured)
- **Internal**
  - `Union` guard evaluation is optimized and relevant Ids are stored inside the Union Objects
- **Breaking Change**
  - `Intersection` takes Morphs as parameters, no more in an Array. Also, it takes name and config as extra params (curried)

## 3.0.0-alpha.6

- **New Feature**
  - `Union` is parametrized with guards, enabling `Union` on `Eq`, `Ord` and `Show`
- **Breaking Change**
  - Remove `program-orderable` and `program-no-union`

## 3.0.0-alpha.3

- **New Feature**
  - add `a last param on config callbacks to easy customisation of 'container' types (either, array, etc..`
  - add `numberLiteral`
  - add `oneOfLiterals`
  - add `optional`
  - add `unknownE`
- **Bug Fix**
  - optional inference in constructor (favor `Omit` over `Remove`)

## 3.0.0-RC0

- **New Feature**
  - add `mutable`
- **Breaking Change**
  - make `array`, `nonempty`, `interface`, `partial`, `both` readonly

## 2.0.0

Promotion from 2.0.0-alpha.19

## 2.0.0-alpha.19

- **New Feature**
  - add `record`
- **Polish**
  - add tests for `strMap`
- **Breaking Change**
  - fix wording of `AOfMorphADT` and `EOfMorphADT` (`Morhp` to `Morph`) (thanks @erlandsona)
  - upgrade fast-check to ^2.6.O (this may break some code in userland)

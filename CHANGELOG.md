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

# 0.3.0

- New Feature

  - add isAnyOf
  - add unionADT and intersectionADT

- Breaking Change

  - Move adt to its own space
  - Builder is dumb again

- Polish
  - 'isA' renamed to 'is'

# 0.2.0

- Breaking Change

  - Remove variants in favor of type union narrowing

- Polish
  - Lot of renaming and API changes in order to reduce boilerplate

# 0.1.1

- New Feature

  - add byTagAll (@sledorze)
  - add assignFunction (@sledorze)

- Polish
  - import URI with interpreter signature (@sledorze)
  - correctly narrow variance of Variants

# 0.1.0

Initial release

---
title: usage/summoner.ts
nav_order: 13
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Summoners (interface)](#summoners-interface)
- [makeSummoner (function)](#makesummoner-function)

---

# Summoners (interface)

**Signature**

```ts
export interface Summoners<ProgURI extends ProgramURI, InterpURI extends InterpreterURI> {
  <L, A>(F: InferredProgram<L, A, ProgURI>): Materialized<L, A, ProgURI, InterpURI>
}
```

Added in v0.0.1

# makeSummoner (function)

**Signature**

```ts
export function makeSummoner<PI extends ProgramInterpreter<any, any>>(
  cacheProgramEval: CacheType,
  programInterpreter: PI
) { ... }
```

Added in v0.0.1

---
title: summoner-BASTJ.ts
nav_order: 7
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [AsOpaque (export)](#asopaque-export)
- [AsUOpaque (export)](#asuopaque-export)
- [M (export)](#m-export)
- [UM (export)](#um-export)
- [summon (export)](#summon-export)
- [tagged (export)](#tagged-export)

---

# AsOpaque (export)

**Signature**

```ts
<E, A>(x: M<E, A>) => M<E, A>
```

Added in v0.0.1

# AsUOpaque (export)

**Signature**

```ts
<A>(x: UM<A>) => UM<A>
```

Added in v0.0.1

# M (export)

**Signature**

```ts
any
```

Added in v0.0.1

# UM (export)

**Signature**

```ts
any
```

Added in v0.0.1

# summon (export)

**Signature**

```ts
Summoners<"ProgramUnionURI", "BASTJInterpreterURI">
```

Added in v0.0.1

# tagged (export)

**Signature**

```ts
<Tag>(tag: Tag) => <Types>(o: Types) => MorphADT<{ [k in keyof Types]: Types[k] extends InhabitedTypes<infer E, infer A> ? [E, A] : never; }, Tag, "ProgramUnionURI", "BASTJInterpreterURI">
```

Added in v0.0.1

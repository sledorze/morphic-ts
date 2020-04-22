import { genConfig, ConfigsForType, AnyEnv } from '../../src/config'
import { URIS, HKT, URIS2 } from '../../src/HKT'
import { Ord } from 'fp-ts/lib/Ord'
import { Eq } from 'fp-ts/lib/Eq'
import { Type } from 'io-ts'

declare module '../../src/HKT' {
  interface URItoKind<R, A> {
    ['Eq']: (env: R) => TypeEq<A>
  }
  interface URItoKind<R, A> {
    ['Ord']: (env: R) => TypeOrd<A>
  }

  interface URItoKind2<R, E, A> {
    ['IOTs']: (env: R) => TypeIOTs<E, A>
  }
}

// IOTs def
class TypeIOTs<E, A> {
  _E!: E
  _A!: A
  constructor(ord: Type<A, E>) {}
}

const iotsConfig = genConfig('IOTs')

declare module '../../src/config' {
  interface ConfigType<E, A> {
    ['IOTs']: Type<A, E>
  }
}

// Ord def
class TypeOrd<A> {
  _A!: A
  constructor(ord: Ord<A>) {}
}

const ordConfig = genConfig('Ord')

declare module '../../src/config' {
  interface ConfigType<E, A> {
    ['Ord']: Ord<A>
  }
}
// Eq def
class TypeEq<A> {
  _A!: A
  constructor(ord: Eq<A>) {}
}

const eqConfig = genConfig('Eq')

declare module '../../src/config' {
  interface ConfigType<E, A> {
    ['Eq']: Eq<A>
  }
}

// Algebra
interface Foo<F extends URIS | URIS2, Env extends AnyEnv> {
  myFunc: <A>(t: HKT<F, Env, A>) => (a: ConfigsForType<Env, unknown, A>) => HKT<F, Env, A>
  term: <A>() => HKT<F, Env, A>
}

// Program

const doIt = <Env extends AnyEnv = {}>() => <F extends URIS | URIS2>(f: (x: Foo<F, Env>) => void) => f

doIt<{ Ord: { x: string } }>()(F => {
  // $ExpectType HKT<"Eq" | "Ord" | "IOTs", { Ord: { x: string; }; }, string>
  F.myFunc(F.term<string>())({
    ...ordConfig(
      // $ExpectType (x: Ord<string>, e: { x: string; }) => Ord<string>
      (x, e) =>
        // $ExpectType Ord<string>
        x
    )
  })
})

doIt<{ Ord: { b: number } }>()(F => {
  // $ExpectType HKT<"Eq" | "Ord" | "IOTs", { Ord: { b: number; }; }, string>
  F.myFunc(F.term<string>())({
    ...ordConfig(
      // $ExpectType (x: Ord<string>, e: { b: number; }) => Ord<string>
      (x, e) =>
        // $ExpectType Ord<string>
        x
    )
  })
})

doIt<{ Ord: { b: number } }>()(F => {
  // $ExpectError
  F.myFunc(F.term<string>())({
    ...ordConfig(
      (x, e: { a: string }) =>
        // $ExpectType Ord<string>
        x
    )
  })
})

doIt<{ Eq: { a: string } } & { Ord: { b: number } }>()(F => {
  // $ExpectType HKT<"Eq" | "Ord" | "IOTs", { Eq: { a: string; }; } & { Ord: { b: number; }; }, string>
  F.myFunc(F.term<string>())({
    ...ordConfig(
      // $ExpectType (x: Ord<string>, e: { b: number; }) => Ord<string>
      (x, e) => {
        // $ExpectType { b: number; }
        e
        // $ExpectType Ord<string>
        x
        return x
      }
    ),
    ...eqConfig(
      // $ExpectType (x: Eq<string>, e: { a: string; }) => Eq<string>
      (x, e) => {
        // $ExpectType { a: string; }
        e
        // $ExpectType Eq<string>
        x
        return x
      }
    )
  })
})

doIt<{ Eq: { a: string } }>()(F => {
  // $ExpectType HKT<"Eq" | "Ord" | "IOTs", { Eq: { a: string; }; }, string>
  F.myFunc(F.term<string>())({
    ...ordConfig(
      // $ExpectType (x: Ord<string>, e: unknown) => Ord<string>
      (x, e) =>
        // $ExpectType Ord<string>
        x
    ),
    ...eqConfig(
      // $ExpectType (x: Eq<string>, e: { a: string; }) => Eq<string>
      (x, e: { a: string }) =>
        // $ExpectType Eq<string>
        x
    )
  })
})

doIt<{ IOTs: { c: string } } & { Eq: { a: string } } & { Ord: { b: number } }>()(F => {
  // $ExpectType HKT<"Eq" | "Ord" | "IOTs", { IOTs: { c: string; }; } & { Eq: { a: string; }; } & { Ord: { b: number; }; }, string>
  F.myFunc(F.term<string>())({
    ...ordConfig(
      // $ExpectType (x: Ord<string>, e: { b: number; }) => Ord<string>
      (x, e) => {
        // $ExpectType { b: number; }
        e
        // $ExpectType Ord<string>
        x
        return x
      }
    ),
    ...eqConfig(
      // $ExpectType (x: Eq<string>, e: { a: string; }) => Eq<string>
      (x, e: { a: string }) => {
        // $ExpectType { a: string; }
        e
        // $ExpectType Eq<string>
        x
        return x
      }
    ),
    ...iotsConfig(
      // $ExpectType (x: Type<string, unknown, unknown>, e: { c: string; }) => Type<string, unknown, unknown>
      (x, e: { c: string }) => {
        // $ExpectType { c: string; }
        e
        // $ExpectType Type<string, unknown, unknown>
        x
        return x
      }
    )
  })
})

interface Foo2<F extends URIS | URIS2, Env extends AnyEnv> {
  myFunc: <R, A>(t: HKT<F, R, A>) => (a: ConfigsForType<Env, unknown, A>) => HKT<F, Env, A>
  term: <R, A>() => HKT<F, R, A>
}

const doIt2 = <Env extends AnyEnv>() => <F extends URIS | URIS2>(f: (x: Foo2<F, Env>) => void) => f

doIt2<{ Eq: { a: string } }>()(F => {
  F.myFunc(F.term<{}, string>())({
    ...ordConfig((x, e) => x)
  })
})

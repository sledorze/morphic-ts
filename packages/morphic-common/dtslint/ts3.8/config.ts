import { ConfigsEnvs, genConfig, ConfigsForType } from '../../src/config'
import { URIS, HKT, URIS2 } from '../../src/HKT'
import { Ord } from 'fp-ts/lib/Ord'
import { Eq } from 'fp-ts/lib/Eq'
import { Type } from 'io-ts'
import { KeepNotUndefinedOrUnknown } from '../../src/core'

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

interface Foo<F extends URIS | URIS2> {
  myFunc: <R, A>(t: HKT<F, R, A>) => <C extends ConfigsForType<unknown, A>>(a: C) => HKT<F, ConfigsEnvs<C>, A>
  term: <R, A>() => HKT<F, R, A>
}

// Program

const doIt = <F extends URIS | URIS2>(f: (x: Foo<F>) => void) => f

doIt(F => {
  // $ExpectType HKT<"Eq" | "Ord" | "IOTs", unknown, string>
  F.myFunc(F.term<{}, string>())({
    ...ordConfig(
      // $ExpectType (x: Ord<string>, e: any) => Ord<string>
      (x, e) =>
        // $ExpectType Ord<string>
        x
    )
  })
})

doIt(F => {
  // $ExpectType HKT<"Eq" | "Ord" | "IOTs", { Ord: { b: number; }; }, string>
  F.myFunc(F.term<{}, string>())({
    ...ordConfig(
      // $ExpectType (x: Ord<string>, e: { b: number; }) => Ord<string>
      (x, e: { b: number }) =>
        // $ExpectType Ord<string>
        x
    )
  })
})

doIt(F => {
  // $ExpectType HKT<"Eq" | "Ord" | "IOTs", { Eq: { a: string; }; } & { Ord: { b: number; }; }, string>
  F.myFunc(F.term<{}, string>())({
    ...ordConfig(
      // $ExpectType (x: Ord<string>, e: { b: number; }) => Ord<string>
      (x, e: { b: number }) =>
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

doIt(F => {
  // $ExpectType HKT<"Eq" | "Ord" | "IOTs", { Eq: { a: string; }; }, string>
  F.myFunc(F.term<{}, string>())({
    ...ordConfig(
      // $ExpectType (x: Ord<string>, e: any) => Ord<string>
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

doIt(F => {
  // $ExpectType HKT<"Eq" | "Ord" | "IOTs", { IOTs: { c: string; }; } & { Eq: { a: string; }; } & { Ord: { b: number; }; }, string>
  F.myFunc(F.term<{}, string>())({
    ...ordConfig(
      // $ExpectType (x: Ord<string>, e: { b: number; }) => Ord<string>
      (x, e: { b: number }) =>
        // $ExpectType Ord<string>
        x
    ),
    ...eqConfig(
      // $ExpectType (x: Eq<string>, e: { a: string; }) => Eq<string>
      (x, e: { a: string }) =>
        // $ExpectType Eq<string>
        x
    ),
    ...iotsConfig(
      // $ExpectType (x: Type<string, unknown, unknown>, e: { c: string; }) => Type<string, unknown, unknown>
      (x, e: { c: string }) =>
        // $ExpectType Type<string, unknown, unknown>
        x
    )
  })
})

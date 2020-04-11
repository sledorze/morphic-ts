import { GenConfig, ByInterp } from '../../src/config'
import { URIS, HKT, URIS2 } from '../../src/HKT'
import { Compact } from '../../src/core'
import { Ord } from 'fp-ts/lib/Ord'
import { Eq } from 'fp-ts/lib/Eq'
import { Type } from 'io-ts'

interface ConfigType<E, A> {}

type MapToGenConfig<T extends Record<URIS | URIS2, any>> = ByInterp<
  { [k in URIS | URIS2]?: GenConfig<T[k], any> },
  URIS | URIS2
>

type ConfigForType<E, A> = MapToGenConfig<ConfigType<E, A>>

type Extract<T extends MapToGenConfig<any>> = Compact<
  {
    [k in keyof T]: T[k] extends (a: any, env: infer R) => any ? R : never
  }
>

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
  _TYPE!: Type<A>
  constructor(ord: Type<A, E>) {}
}

const iotsConfig: {
  <R, E, A>(config: GenConfig<Type<A, E>, R>): { ['IOTs']: GenConfig<Type<A, E>, unknown extends R ? unknown : R> }
} = 1 as any

interface ConfigType<E, A> {
  ['IOTs']: Type<A, E>
}

// Ord def
class TypeOrd<A> {
  _A!: A
  _TYPE!: Ord<A>
  constructor(ord: Ord<A>) {}
}

const ordConfig: {
  <R, A>(config: GenConfig<Ord<A>, R>): { ['Ord']: GenConfig<Ord<A>, unknown extends R ? unknown : R> }
} = 1 as any

interface ConfigType<E, A> {
  ['Ord']: Ord<A>
}

// Eq def
class TypeEq<A> {
  _A!: A
  _TYPE!: Eq<A>
  constructor(ord: Eq<A>) {}
}

const eqConfig: {
  <R, A>(config: GenConfig<Eq<A>, R>): { ['Eq']: GenConfig<Eq<A>, unknown extends R ? unknown : R> }
} = 1 as any

interface ConfigType<E, A> {
  ['Eq']: Eq<A>
}

// Algebra

interface Foo<F extends URIS | URIS2> {
  myFunc: <R, A>(t: HKT<F, R, A>) => <C extends ConfigForType<unknown, A>>(a: C) => HKT<F, Extract<typeof a>, A>
  term: <R, A>() => HKT<F, R, A>
}

// Program

const doIt = <F extends URIS | URIS2>(f: (x: Foo<F>) => void) => f

doIt(F => {
  // $ExpectType HKT<"Eq" | "Ord" | "IOTs", Compact<{ Ord: unknown; }>, string>
  F.myFunc(F.term<{}, string>())({
    ...ordConfig(
      (x, e) =>
        // $ExpectType Ord<string>
        x
    )
  })
})

doIt(F => {
  // $ExpectType HKT<"Eq" | "Ord" | "IOTs", Compact<{ Ord: { b: number; }; }>, string>
  F.myFunc(F.term<{}, string>())({
    ...ordConfig(
      (x, e: { b: number }) =>
        // $ExpectType Ord<string>
        x
    )
  })
})

doIt(F => {
  // $ExpectType HKT<"Eq" | "Ord" | "IOTs", Compact<{ Eq: { a: string; }; Ord: { b: number; }; }>, string>
  F.myFunc(F.term<{}, string>())({
    ...ordConfig(
      (x, e: { b: number }) =>
        // $ExpectType Ord<string>
        x
    ),
    ...eqConfig(
      (x, e: { a: string }) =>
        // $ExpectType Eq<string>
        x
    )
  })
})

doIt(F => {
  // $ExpectType HKT<"Eq" | "Ord" | "IOTs", Compact<{ Eq: { a: string; }; Ord: unknown; }>, string>
  F.myFunc(F.term<{}, string>())({
    ...ordConfig(
      (x, e) =>
        // $ExpectType Ord<string>
        x
    ),
    ...eqConfig(
      (x, e: { a: string }) =>
        // $ExpectType Eq<string>
        x
    )
  })
})

doIt(F => {
  // $ExpectType HKT<"Eq" | "Ord" | "IOTs", Compact<{ IOTs: { c: string; }; Eq: { a: string; }; Ord: { b: number; }; }>, string>
  F.myFunc(F.term<{}, string>())({
    ...ordConfig(
      (x, e: { b: number }) =>
        // $ExpectType Ord<string>
        x
    ),
    ...eqConfig(
      (x, e: { a: string }) =>
        // $ExpectType Eq<string>
        x
    ),
    ...iotsConfig(
      (x, e: { c: string }) =>
        // $ExpectType Type<string, unknown, unknown>
        x
    )
  })
})

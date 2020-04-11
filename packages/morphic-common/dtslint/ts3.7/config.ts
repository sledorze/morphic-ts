import { genConfig, GenConfig, ConfigsOf, ConfigsEnvs, MaybeUndefinedIfOptional } from '../../src/config'
import { URIS, HKT } from '../../src/HKT'
import { OptionalIfUndefined } from '../../src/core'
import { Ord } from 'fp-ts/lib/Ord'
import { Eq } from 'fp-ts/lib/Eq'

declare module '../../src/HKT' {
  interface URItoKind<R, A> {
    ['Eq']: (env: R) => TypeEq<A>
  }
  interface URItoKind<R, A> {
    ['Ord']: (env: R) => TypeOrd<A>
  }
}

class TypeOrd<A> {
  _A!: A
  _TYPE!: Ord<A>
  constructor(ord: Ord<A>) {}
}
class TypeEq<A> {
  _A!: A
  _TYPE!: Eq<A>
  constructor(ord: Eq<A>) {}
}

const ordConfig: {
  <A, R>(config: GenConfig<Ord<A>, R>): { ['Ord']: GenConfig<Ord<A>, unknown extends R ? unknown : R> }
} = 1 as any // genConfig('Ord')

const eqConfig: {
  <A, R>(config: GenConfig<Eq<A>, R>): { ['Eq']: GenConfig<Eq<A>, unknown extends R ? unknown : R> }
} = 1 as any // genConfig('Eq')

interface Foo<F extends URIS> {
  myFunc: <R, A>(
    t: HKT<F, R, A>
  ) => (a: ByInterp<{ [k in URIS]?: GenConfig<Ord<string>, any> }, URIS>) => ConfigsEnvs<typeof a>
  term: <R, A>() => HKT<F, R, A>
}

const doIt = <F extends URIS>(f: (x: Foo<F>) => void) => f

const testMagnet: (f: { ['Ord']: GenConfig<TypeOrd<string>, {}> }) => void = 1 as any
testMagnet(ordConfig2((x, e) => x))

const ress = doIt(F => F.myFunc(F.term<{}, string>())({ ['Ord']: x => x })) // (ordConfig(x => x)))

const m: Foo<'Eq'> = 1 as any

type RRRR = URIS
// const myFunc: <T>(t: T) => <C extends ConfigsOf<GenConfig<T, any>>>(a: C) => ConfigsEnvs<typeof a> = 1 as any
// const myFunc: <T>(t: T) => <C extends ConfigsOf<GenConfig<T, any>>>(a: C) => ConfigsEnvs<typeof a> = 1 as any

// $ExpectType Compact<{ Eq: { x: string; }; }>
// const res = myFunc('a' as any)({ ...eqConfig((a, e: { x: string }) => a) })

// $ExpectType Compact<{ Eq: { x: string; }; Ord: unknown; }>
myFunc('a', { ...ordConfig((a, e) => a), ...eqConfig((a, e: { x: string }) => a) })

// $ExpectType Compact<{ Eq: { x: string; }; Ord: { y: number; }; }>
myFunc('a', { ...ordConfig((a, e: { y: number }) => a), ...eqConfig((a, e: { x: string }) => a) })

type ByInterp<Config, Interp extends URIS> = MaybeUndefinedIfOptional<
  OptionalIfUndefined<
    {
      [I in Interp]: I extends keyof Config ? Config[I] : undefined
    }
  >
>

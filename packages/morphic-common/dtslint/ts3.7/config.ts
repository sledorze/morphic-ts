import { URIS2, URIS } from 'fp-ts/lib/HKT'
import { genConfig, GenConfig, ConfigsOf, ConfigsEnvs } from '../../src/config'

declare module '../../src/HKT' {
  interface URItoKind<R, A> {
    ['Eq']: (env: R) => Type<A>
  }
  interface URItoKind<R, A> {
    ['Ord']: (env: R) => Type<A>
  }
}

const aConfig = genConfig('Ord')
const bConfig = genConfig('Eq')

interface Type<A> {
  _A: A
}

interface GenConfigIOTS<A, E extends {}> extends GenConfig<Type<A>, E> {}
const myFunc = <T extends string, C extends ConfigsOf<GenConfigIOTS<T, any>>>(t: T, a: C): ConfigsEnvs<typeof a> =>
  1 as any

// $ExpectType Compact<{ Eq: { x: string; }; }>
myFunc('a', { ...bConfig((a, e: { x: string }) => a) })

// $ExpectType Compact<{ Eq: { x: string; }; Ord: unknown; }>
myFunc('a', { ...aConfig((a, e) => a), ...bConfig((a, e: { x: string }) => a) })

// $ExpectType Compact<{ Eq: { x: string; }; Ord: { y: number; }; }>
myFunc('a', { ...aConfig((a, e: { y: number }) => a), ...bConfig((a, e: { x: string }) => a) })

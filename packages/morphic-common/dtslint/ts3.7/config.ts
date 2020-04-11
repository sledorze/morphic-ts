import { URIS2, URIS } from 'fp-ts/lib/HKT'

interface GenConfig<A, R> {
  (a: A, r: R): A
}

type Compact<A> = { [k in keyof A]: A[k] }

type ConfigsOf<Conf> = { [k in URIS | URIS2]?: Conf }
type ConfigsEnvs<T extends ConfigsOf<any>> = Compact<
  {
    [k in keyof T]: T[k] extends (a: any, env: infer R) => any ? R : never
  }
>

export const genConfig: <Uri extends URIS | URIS2>(uri: Uri) => ConfigWrapper<Uri> = uri => config =>
  ({ [uri]: config } as any)

export interface ConfigWrapper<Uri extends URIS | URIS2> {
  <A, R>(config: GenConfig<A, R>): { [k in Uri]: GenConfig<A, unknown extends R ? unknown : R> }
}

// Test ---

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

interface Type<A> {
  _A: A
}

interface GenConfig<A, R> {
  (a: A, r: R): A
}

type Compact<A> = { [k in keyof A]: A[k] }

type MKeys = 'a' | 'b' | 'c'

type ConfigsOf<Conf> = { [k in MKeys]?: Conf }
type ConfigsEnvs<T extends ConfigsOf<any>> = Compact<
  {
    [k in keyof T]: T[k] extends (a: any, env: infer R) => any ? R : never
  }
>

export const genConfig: <Uri extends MKeys>(uri: Uri) => ConfigWrapper<Uri> = uri => config =>
  ({ [uri]: config } as any)

export interface ConfigWrapper<Uri extends MKeys> {
  <A, R>(config: GenConfig<A, R>): { [k in Uri]: GenConfig<A, unknown extends R ? unknown : R> }
}

const aConfig = genConfig('a')
const bConfig = genConfig('b')

interface GenConfigIOTS<A, E extends {}> extends GenConfig<Type<A>, E> {}
const myFunc = <T extends string, C extends ConfigsOf<GenConfigIOTS<T, any>>>(t: T, a: C): ConfigsEnvs<typeof a> =>
  1 as any

// $ExpectType Compact<{ b: { x: string; }; }>
myFunc('a', { ...bConfig((a, e: { x: string }) => a) })

// $ExpectType Compact<{ b: { x: string; }; a: unknown; }>
myFunc('a', { ...aConfig((a, e) => a), ...bConfig((a, e: { x: string }) => a) })

// $ExpectType Compact<{ b: { x: string; }; a: { y: number; }; }>
myFunc('a', { ...aConfig((a, e: { y: number }) => a), ...bConfig((a, e: { x: string }) => a) })

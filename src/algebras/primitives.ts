import { Option } from 'fp-ts/lib/Option'
import { URIS2, Kind2, URIS, Kind, HKT2 } from '../HKT'
import { PrimitiveArrayConfig } from './hkt'
import { ByInterp, KeepNotUndefined } from '../core'

export type Keys = Record<string, null>

export const URI = 'Primitive'
export type URI = typeof URI

declare module './hkt' {
  interface Algebra<F> {
    Primitive: ModelAlgebraPrimitive<F>
  }
  interface Algebra1<F extends URIS> {
    Primitive: ModelAlgebraPrimitive1<F>
  }
  interface Algebra2<F extends URIS2> {
    Primitive: ModelAlgebraPrimitive2<F>
  }

  export interface PrimitiveArrayConfig {}
}

type isOptionalConfig<C, Y, N> = keyof KeepNotUndefined<ByInterp<C, URIS | URIS2>> extends undefined ? Y : N

export interface ModelAlgebraPrimitive<F> {
  date: HKT2<F, string, Date>
  string: HKT2<F, string, string>
  number: HKT2<F, number, number>
  boolean: HKT2<F, boolean, boolean>
  stringLiteral: <T extends string>(value: T) => HKT2<F, string, typeof value>
  keysOf: <K extends Keys>(keys: K) => HKT2<F, string, keyof typeof keys>
  nullable: <L, A>(T: HKT2<F, L, A>) => HKT2<F, null | L, Option<A>>
  array: isOptionalConfig<
    PrimitiveArrayConfig,
    <L, A>(a: HKT2<F, L, A>, config?: ByInterp<PrimitiveArrayConfig, URIS | URIS2>) => HKT2<F, Array<L>, Array<A>>,
    <L, A>(a: HKT2<F, L, A>, config: ByInterp<PrimitiveArrayConfig, URIS | URIS2>) => HKT2<F, Array<L>, Array<A>>
  >
}

const ddd = <A>(a: A, b: undefined): A => {
  return a
}

type DDD<X> = X extends (a: infer A, b: infer B) => infer R ? Parameters X : 'ee'
type RRr = DDD<typeof ddd>

export interface ModelAlgebraPrimitive1<F extends URIS> {
  date: Kind<F, Date>
  string: Kind<F, string>
  number: Kind<F, number>
  boolean: Kind<F, boolean>
  stringLiteral: <T extends string>(value: T) => Kind<F, typeof value>
  keysOf: <K extends Keys>(keys: K) => Kind<F, keyof typeof keys>
  nullable: <A>(T: Kind<F, A>) => Kind<F, Option<A>>
  array: <A>(a: Kind<F, A>, config: ByInterp<PrimitiveArrayConfig, F>) => Kind<F, Array<A>>
}

export interface ModelAlgebraPrimitive2<F extends URIS2> {
  date: Kind2<F, string, Date>
  string: Kind2<F, string, string>
  number: Kind2<F, number, number>
  boolean: Kind2<F, boolean, boolean>
  stringLiteral: <T extends string>(value: T) => Kind2<F, string, typeof value>
  keysOf: <K extends Keys>(keys: K) => Kind2<F, string, keyof typeof keys>
  nullable: <L, A>(T: Kind2<F, L, A>) => Kind2<F, null | L, Option<A>>
  array: <L, A>(a: Kind2<F, L, A>, config: ByInterp<PrimitiveArrayConfig, F>) => Kind2<F, Array<L>, Array<A>>
}

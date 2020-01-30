import { Option } from 'fp-ts/lib/Option'
import { URIS2, Kind2, URIS, Kind, HKT2 } from '../common/HKT'
import {
  PrimitiveArrayConfig,
  PrimitiveStringConfig,
  PrimitiveDateConfig,
  PrimitiveNumberConfig,
  PrimitiveBooleanConfig,
  PrimitiveArrayConfig2
} from '../algebras/hkt'
import { ByInterp, isOptionalConfig } from '../common/core'

export type Keys = Record<string, null>

export const PrimitiveURI = Symbol()
export type PrimitiveURI = typeof PrimitiveURI

declare module '../algebras/hkt' {
  interface Algebra<F> {
    [PrimitiveURI]: ModelAlgebraPrimitive<F>
  }
  interface Algebra1<F extends URIS> {
    [PrimitiveURI]: ModelAlgebraPrimitive1<F>
  }
  interface Algebra2<F extends URIS2> {
    [PrimitiveURI]: ModelAlgebraPrimitive2<F>
  }

  export interface PrimitiveDateConfig {}
  export interface PrimitiveStringConfig {}
  export interface PrimitiveNumberConfig {}
  export interface PrimitiveBooleanConfig {}
  export interface PrimitiveArrayConfig<A> {}
  export interface PrimitiveArrayConfig2<E, A> {}
}

export interface ModelAlgebraPrimitive<F> {
  nullable: <L, A>(T: HKT2<F, L, A>) => HKT2<F, null | L, Option<A>>
  boolean: {
    (): isOptionalConfig<PrimitiveBooleanConfig, HKT2<F, boolean, boolean>>
    (config: ByInterp<PrimitiveBooleanConfig, URIS | URIS2>): HKT2<F, boolean, boolean>
  }
  number(): isOptionalConfig<PrimitiveNumberConfig, HKT2<F, number, number>>
  number(config: ByInterp<PrimitiveNumberConfig, URIS | URIS2>): HKT2<F, number, number>
  string(): isOptionalConfig<PrimitiveStringConfig, HKT2<F, string, string>>
  string(config: ByInterp<PrimitiveStringConfig, URIS | URIS2>): HKT2<F, string, string>
  stringLiteral: <T extends string>(value: T) => HKT2<F, string, typeof value>
  keysOf: <K extends Keys>(keys: K, name?: string) => HKT2<F, string, keyof typeof keys>

  array<L, A>(a: HKT2<F, L, A>): isOptionalConfig<PrimitiveArrayConfig<A>, HKT2<F, Array<L>, Array<A>>>
  array<L, A>(a: HKT2<F, L, A>, config: ByInterp<PrimitiveArrayConfig<A>, URIS | URIS2>): HKT2<F, Array<L>, Array<A>>

  date(): isOptionalConfig<PrimitiveDateConfig, HKT2<F, string, Date>>
  date(config: ByInterp<PrimitiveDateConfig, URIS | URIS2>): HKT2<F, string, Date>
}

export interface ModelAlgebraPrimitive1<F extends URIS> {
  nullable: <A>(T: Kind<F, A>) => Kind<F, Option<A>>
  boolean(config?: ByInterp<PrimitiveBooleanConfig, F>): Kind<F, boolean>
  number(config?: ByInterp<PrimitiveNumberConfig, F>): Kind<F, number>
  string(config?: ByInterp<PrimitiveStringConfig, F>): Kind<F, string>
  stringLiteral: <T extends string>(value: T) => Kind<F, typeof value>
  keysOf: <K extends Keys>(keys: K, name?: string) => Kind<F, keyof typeof keys>
  array: <A>(a: Kind<F, A>, config?: ByInterp<PrimitiveArrayConfig<A>, F>) => Kind<F, Array<A>>
  date(config?: ByInterp<PrimitiveDateConfig, F>): Kind<F, Date>
}

export interface ModelAlgebraPrimitive2<F extends URIS2> {
  nullable: <L, A>(T: Kind2<F, L, A>) => Kind2<F, null | L, Option<A>>
  boolean(config?: ByInterp<PrimitiveBooleanConfig, F>): Kind2<F, boolean, boolean>
  number(config?: ByInterp<PrimitiveNumberConfig, F>): Kind2<F, number, number>
  string(config?: ByInterp<PrimitiveStringConfig, F>): Kind2<F, string, string>
  stringLiteral: <T extends string>(value: T) => Kind2<F, string, typeof value>
  keysOf: <K extends Keys>(keys: K, name?: string) => Kind2<F, string, keyof typeof keys>
  array: <L, A>(a: Kind2<F, L, A>, config?: ByInterp<PrimitiveArrayConfig2<L, A>, F>) => Kind2<F, Array<L>, Array<A>>
  date(config?: ByInterp<PrimitiveDateConfig, F>): Kind2<F, string, Date>
}

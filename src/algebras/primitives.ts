import { Option } from 'fp-ts/lib/Option'
import { URIS2, Kind2, URIS, Kind, HKT2 } from '../HKT'
import {
  PrimitiveArrayConfig,
  PrimitiveStringConfig,
  PrimitiveDateConfig,
  PrimitiveNumberConfig,
  PrimitiveBooleanConfig
} from './hkt'
import { ByInterp, isOptionalConfig } from '../core'

export type Keys = Record<string, null>

export const PrimitiveURI = Symbol()
export type PrimitiveURI = typeof PrimitiveURI

declare module './hkt' {
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
}

export interface ModelAlgebraPrimitive<F> {
  date(): isOptionalConfig<
    PrimitiveDateConfig,
    HKT2<F, string, Date>,
    'Requiring some config via date({ <Interp>: ...  })'
  >
  date(config: ByInterp<PrimitiveDateConfig, URIS | URIS2>): HKT2<F, string, Date>
  string(): isOptionalConfig<
    PrimitiveStringConfig,
    HKT2<F, string, string>,
    'Requiring some config via string({ <Interp>: ...  })'
  >
  string(config: ByInterp<PrimitiveStringConfig, URIS | URIS2>): HKT2<F, string, string>
  number(): isOptionalConfig<
    PrimitiveNumberConfig,
    HKT2<F, number, number>,
    'Requiring some config via number({ <Interp>: ...  })'
  >
  number(config: ByInterp<PrimitiveNumberConfig, URIS | URIS2>): HKT2<F, number, number>
  boolean(): isOptionalConfig<
    PrimitiveBooleanConfig,
    HKT2<F, boolean, boolean>,
    'Requiring some config via boolean({ <Interp>: ...  })'
  >
  boolean(config: ByInterp<PrimitiveBooleanConfig, URIS | URIS2>): HKT2<F, boolean, boolean>
  stringLiteral: <T extends string>(value: T) => HKT2<F, string, typeof value>
  keysOf: <K extends Keys>(keys: K, name?: string) => HKT2<F, string, keyof typeof keys>
  nullable: <L, A>(T: HKT2<F, L, A>) => HKT2<F, null | L, Option<A>>
  array<L, A>(
    a: HKT2<F, L, A>
  ): isOptionalConfig<
    PrimitiveArrayConfig<A>,
    HKT2<F, Array<L>, Array<A>>,
    'Requiring some config via array({ <Interp>: ... })'
  >
  array<L, A>(a: HKT2<F, L, A>, config: ByInterp<PrimitiveArrayConfig<A>, URIS | URIS2>): HKT2<F, Array<L>, Array<A>>
}

export interface ModelAlgebraPrimitive1<F extends URIS> {
  date(config?: ByInterp<PrimitiveDateConfig, F>): Kind<F, Date>
  string(config?: ByInterp<PrimitiveStringConfig, URIS>): Kind<F, string>
  number(config?: ByInterp<PrimitiveNumberConfig, F>): Kind<F, number>
  boolean(config?: ByInterp<PrimitiveBooleanConfig, F>): Kind<F, boolean>
  stringLiteral: <T extends string>(value: T) => Kind<F, typeof value>
  keysOf: <K extends Keys>(keys: K, name?: string) => Kind<F, keyof typeof keys>
  nullable: <A>(T: Kind<F, A>) => Kind<F, Option<A>>
  array: <A>(a: Kind<F, A>, config?: ByInterp<PrimitiveArrayConfig<A>, F>) => Kind<F, Array<A>>
}

export interface ModelAlgebraPrimitive2<F extends URIS2> {
  date(config?: ByInterp<PrimitiveDateConfig, F>): Kind2<F, string, Date>
  string(config?: ByInterp<PrimitiveStringConfig, F>): Kind2<F, string, string>
  number(config?: ByInterp<PrimitiveNumberConfig, F>): Kind2<F, number, number>
  boolean(config?: ByInterp<PrimitiveBooleanConfig, F>): Kind2<F, boolean, boolean>
  stringLiteral: <T extends string>(value: T) => Kind2<F, string, typeof value>
  keysOf: <K extends Keys>(keys: K, name?: string) => Kind2<F, string, keyof typeof keys>
  nullable: <L, A>(T: Kind2<F, L, A>) => Kind2<F, null | L, Option<A>>
  array: <L, A>(a: Kind2<F, L, A>, config?: ByInterp<PrimitiveArrayConfig<A>, F>) => Kind2<F, Array<L>, Array<A>>
}

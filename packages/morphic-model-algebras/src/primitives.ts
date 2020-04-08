import { Option } from 'fp-ts/lib/Option'
import { URIS2, Kind2, URIS, Kind, HKT2 } from '@morphic-ts/common/lib/HKT'
import {
  PrimitiveArrayConfig,
  PrimitiveStringConfig,
  PrimitiveDateConfig,
  PrimitiveNumberConfig,
  PrimitiveBooleanConfig,
  PrimitiveBigIntConfig,
  PrimitiveStringLiteralConfig,
  PrimitiveKeysOfConfig,
  PrimitiveNullableConfig
} from '@morphic-ts/algebras/lib/hkt'
import { ByInterp, isOptionalConfig, NoEnv } from '@morphic-ts/common/lib/core'

/**
 *  @since 0.0.1
 */
export type Keys = Record<string, null>

/**
 *  @since 0.0.1
 */
export const PrimitiveURI = 'PrimitiveURI' as const
/**
 *  @since 0.0.1
 */
export type PrimitiveURI = typeof PrimitiveURI

declare module '@morphic-ts/algebras/lib/hkt' {
  export interface Algebra<F> {
    [PrimitiveURI]: ModelAlgebraPrimitive<F>
  }
  export interface Algebra1<F extends URIS> {
    [PrimitiveURI]: ModelAlgebraPrimitive1<F>
  }
  export interface Algebra2<F extends URIS2> {
    [PrimitiveURI]: ModelAlgebraPrimitive2<F>
  }

  /**
   *  @since 0.0.1
   */
  export interface PrimitiveDateConfig<RC> {}
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveStringConfig<RC> {}
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveStringLiteralConfig<RC, K> {}
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveKeysOfConfig<RC, K> {}
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveNumberConfig<RC> {}
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveBigIntConfig<RC> {}
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveBooleanConfig<RC> {}
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveArrayConfig<RC, E, A> {}
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveNullableConfig<RC, E, A> {}
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraPrimitive<F> {
  _F: F
  nullable: {
    <L, A, R>(T: HKT2<F, R, L, A>): isOptionalConfig<
      PrimitiveNullableConfig<NoEnv, L, A>,
      HKT2<F, R, null | L, Option<A>>
    >
    <L, A, R, RC>(T: HKT2<F, R, L, A>, config: ByInterp<PrimitiveNullableConfig<RC, L, A>, URIS | URIS2>): HKT2<
      F,
      R & RC,
      null | L,
      Option<A>
    >
  }
  boolean: {
    (): isOptionalConfig<PrimitiveBooleanConfig<NoEnv>, HKT2<F, NoEnv, boolean, boolean>>
    <RC>(config: ByInterp<PrimitiveBooleanConfig<RC>, URIS | URIS2>): HKT2<F, RC, boolean, boolean>
  }
  number: {
    (): isOptionalConfig<PrimitiveNumberConfig<NoEnv>, HKT2<F, NoEnv, number, number>>
    <RC>(config: ByInterp<PrimitiveNumberConfig<RC>, URIS | URIS2>): HKT2<F, RC, number, number>
  }
  bigint: {
    (): isOptionalConfig<PrimitiveBigIntConfig<NoEnv>, HKT2<F, NoEnv, string, bigint>>
    <RC>(config: ByInterp<PrimitiveBigIntConfig<RC>, URIS | URIS2>): HKT2<F, RC, string, bigint>
  }
  string: {
    (): isOptionalConfig<PrimitiveStringConfig<NoEnv>, HKT2<F, NoEnv, string, string>>
    <RC>(config: ByInterp<PrimitiveStringConfig<RC>, URIS | URIS2>): HKT2<F, RC, string, string>
  }
  stringLiteral: {
    <T extends string>(value: T): isOptionalConfig<
      PrimitiveStringLiteralConfig<NoEnv, T>,
      HKT2<F, NoEnv, string, typeof value>
    >
    <T extends string, RC>(value: T, config: ByInterp<PrimitiveStringLiteralConfig<RC, T>, URIS | URIS2>): HKT2<
      F,
      RC,
      string,
      typeof value
    >
  }
  keysOf: {
    <K extends Keys>(keys: K): isOptionalConfig<
      PrimitiveKeysOfConfig<NoEnv, keyof K>,
      HKT2<F, NoEnv, string, keyof typeof keys>
    >
    <K extends Keys, RC>(keys: K, config: ByInterp<PrimitiveKeysOfConfig<RC, keyof K>, URIS | URIS2>): HKT2<
      F,
      RC,
      string,
      keyof typeof keys
    >
  }
  array: {
    <L, A, R>(a: HKT2<F, R, L, A>): isOptionalConfig<PrimitiveArrayConfig<NoEnv, L, A>, HKT2<F, R, Array<L>, Array<A>>>
    <L, A, R, RC>(a: HKT2<F, R, L, A>, config: ByInterp<PrimitiveArrayConfig<RC, L, A>, URIS | URIS2>): HKT2<
      F,
      R & RC,
      Array<L>,
      Array<A>
    >
  }
  date: {
    (): isOptionalConfig<PrimitiveDateConfig<NoEnv>, HKT2<F, NoEnv, string, Date>>
    <RC>(config: ByInterp<PrimitiveDateConfig<RC>, URIS | URIS2>): HKT2<F, RC, string, Date>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraPrimitive1<F extends URIS> {
  _F: F
  nullable: <A, R, RC>(
    T: Kind<F, R, A>,
    config?: ByInterp<PrimitiveNullableConfig<RC, never, A>, F>
  ) => Kind<F, R & RC, Option<A>>
  boolean<RC>(config?: ByInterp<PrimitiveBooleanConfig<RC>, F>): Kind<F, RC, boolean>
  number<RC>(config?: ByInterp<PrimitiveNumberConfig<RC>, F>): Kind<F, RC, number>
  bigint<RC>(config?: ByInterp<PrimitiveBigIntConfig<RC>, F>): Kind<F, RC, bigint>
  string<RC>(config?: ByInterp<PrimitiveStringConfig<RC>, F>): Kind<F, RC, string>
  stringLiteral: <T extends string, RC>(
    value: T,
    config?: ByInterp<PrimitiveStringLiteralConfig<RC, T>, F>
  ) => Kind<F, RC, typeof value>
  keysOf: <K extends Keys, RC>(
    keys: K,
    config?: ByInterp<PrimitiveKeysOfConfig<RC, keyof K>, F>
  ) => Kind<F, RC, keyof typeof keys>
  array: <A, R, RC>(
    a: Kind<F, R, A>,
    config?: ByInterp<PrimitiveArrayConfig<RC, never, A>, F>
  ) => Kind<F, R & RC, Array<A>>
  date<RC>(config?: ByInterp<PrimitiveDateConfig<RC>, F>): Kind<F, RC, Date>
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraPrimitive2<F extends URIS2> {
  _F: F
  nullable: <L, A, R, RC>(
    T: Kind2<F, R, L, A>,
    config?: ByInterp<PrimitiveNullableConfig<RC, L, A>, F>
  ) => Kind2<F, R & RC, null | L, Option<A>>
  boolean<RC>(config?: ByInterp<PrimitiveBooleanConfig<RC>, F>): Kind2<F, RC, boolean, boolean>
  number<RC>(config?: ByInterp<PrimitiveNumberConfig<RC>, F>): Kind2<F, RC, number, number>
  bigint<RC>(config?: ByInterp<PrimitiveBigIntConfig<RC>, F>): Kind2<F, RC, string, bigint>
  string<RC>(config?: ByInterp<PrimitiveStringConfig<RC>, F>): Kind2<F, RC, string, string>
  stringLiteral: <T extends string, RC>(
    value: T,
    config?: ByInterp<PrimitiveStringLiteralConfig<RC, T>, F>
  ) => Kind2<F, RC, string, typeof value>
  keysOf: <K extends Keys, RC>(
    keys: K,
    config?: ByInterp<PrimitiveKeysOfConfig<RC, keyof K>, F>
  ) => Kind2<F, RC, string, keyof typeof keys>
  array: <L, A, R, RC>(
    a: Kind2<F, R, L, A>,
    config?: ByInterp<PrimitiveArrayConfig<RC, L, A>, F>
  ) => Kind2<F, R & RC, Array<L>, Array<A>>
  date<RC>(config?: ByInterp<PrimitiveDateConfig<RC>, F>): Kind2<F, RC, string, Date>
}

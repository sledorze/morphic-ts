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
import { ByInterp, isOptionalConfig } from '@morphic-ts/common/lib/core'

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
  export interface PrimitiveDateConfig {}
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveStringConfig {}
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveStringLiteralConfig<K> {}
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveKeysOfConfig<K> {}
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveNumberConfig {}
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveBigIntConfig {}
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveBooleanConfig {}
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveArrayConfig<E, A> {}
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveNullableConfig<E, A> {}
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraPrimitive<F> {
  _F: F
  nullable: {
    <L, A>(T: HKT2<F, L, A>): isOptionalConfig<PrimitiveNullableConfig<L, A>, HKT2<F, null | L, Option<A>>>
    <L, A>(T: HKT2<F, L, A>, config: ByInterp<PrimitiveNullableConfig<L, A>, URIS | URIS2>): HKT2<
      F,
      null | L,
      Option<A>
    >
  }
  boolean: {
    (): isOptionalConfig<PrimitiveBooleanConfig, HKT2<F, boolean, boolean>>
    (config: ByInterp<PrimitiveBooleanConfig, URIS | URIS2>): HKT2<F, boolean, boolean>
  }
  number: {
    (): isOptionalConfig<PrimitiveNumberConfig, HKT2<F, number, number>>
    (config: ByInterp<PrimitiveNumberConfig, URIS | URIS2>): HKT2<F, number, number>
  }
  bigint: {
    (): isOptionalConfig<PrimitiveBigIntConfig, HKT2<F, string, bigint>>
    (config: ByInterp<PrimitiveBigIntConfig, URIS | URIS2>): HKT2<F, string, bigint>
  }
  string: {
    (): isOptionalConfig<PrimitiveStringConfig, HKT2<F, string, string>>
    (config: ByInterp<PrimitiveStringConfig, URIS | URIS2>): HKT2<F, string, string>
  }
  stringLiteral: {
    <T extends string>(value: T): isOptionalConfig<PrimitiveStringLiteralConfig<T>, HKT2<F, string, typeof value>>
    <T extends string>(value: T, config: ByInterp<PrimitiveStringLiteralConfig<T>, URIS | URIS2>): HKT2<
      F,
      string,
      typeof value
    >
  }
  keysOf: {
    <K extends Keys>(keys: K): isOptionalConfig<PrimitiveKeysOfConfig<keyof K>, HKT2<F, string, keyof typeof keys>>
    <K extends Keys>(keys: K, config: ByInterp<PrimitiveKeysOfConfig<keyof K>, URIS | URIS2>): HKT2<
      F,
      string,
      keyof typeof keys
    >
  }
  array: {
    <L, A>(a: HKT2<F, L, A>): isOptionalConfig<PrimitiveArrayConfig<L, A>, HKT2<F, Array<L>, Array<A>>>
    <L, A>(a: HKT2<F, L, A>, config: ByInterp<PrimitiveArrayConfig<L, A>, URIS | URIS2>): HKT2<F, Array<L>, Array<A>>
  }
  date: {
    (): isOptionalConfig<PrimitiveDateConfig, HKT2<F, string, Date>>
    (config: ByInterp<PrimitiveDateConfig, URIS | URIS2>): HKT2<F, string, Date>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraPrimitive1<F extends URIS> {
  _F: F
  nullable: <A>(T: Kind<F, A>, config?: ByInterp<PrimitiveNullableConfig<never, A>, F>) => Kind<F, Option<A>>
  boolean(config?: ByInterp<PrimitiveBooleanConfig, F>): Kind<F, boolean>
  number(config?: ByInterp<PrimitiveNumberConfig, F>): Kind<F, number>
  bigint(config?: ByInterp<PrimitiveBigIntConfig, F>): Kind<F, bigint>
  string(config?: ByInterp<PrimitiveStringConfig, F>): Kind<F, string>
  stringLiteral: <T extends string>(
    value: T,
    config?: ByInterp<PrimitiveStringLiteralConfig<T>, F>
  ) => Kind<F, typeof value>
  keysOf: <K extends Keys>(keys: K, config?: ByInterp<PrimitiveKeysOfConfig<keyof K>, F>) => Kind<F, keyof typeof keys>
  array: <A>(a: Kind<F, A>, config?: ByInterp<PrimitiveArrayConfig<never, A>, F>) => Kind<F, Array<A>>
  date(config?: ByInterp<PrimitiveDateConfig, F>): Kind<F, Date>
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraPrimitive2<F extends URIS2> {
  _F: F
  nullable: <L, A>(
    T: Kind2<F, L, A>,
    config?: ByInterp<PrimitiveNullableConfig<L, A>, F>
  ) => Kind2<F, null | L, Option<A>>
  boolean(config?: ByInterp<PrimitiveBooleanConfig, F>): Kind2<F, boolean, boolean>
  number(config?: ByInterp<PrimitiveNumberConfig, F>): Kind2<F, number, number>
  bigint(config?: ByInterp<PrimitiveBigIntConfig, F>): Kind2<F, string, bigint>
  string(config?: ByInterp<PrimitiveStringConfig, F>): Kind2<F, string, string>
  stringLiteral: <T extends string>(
    value: T,
    config?: ByInterp<PrimitiveStringLiteralConfig<T>, F>
  ) => Kind2<F, string, typeof value>
  keysOf: <K extends Keys>(
    keys: K,
    config?: ByInterp<PrimitiveKeysOfConfig<keyof K>, F>
  ) => Kind2<F, string, keyof typeof keys>
  array: <L, A>(a: Kind2<F, L, A>, config?: ByInterp<PrimitiveArrayConfig<L, A>, F>) => Kind2<F, Array<L>, Array<A>>
  date(config?: ByInterp<PrimitiveDateConfig, F>): Kind2<F, string, Date>
}

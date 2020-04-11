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
import { ByInterp, isOptionalConfig, NoEnv } from '@morphic-ts/common/lib/config'

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
  }
  nullableCfg: {
    <L, A, R>(T: HKT2<F, R, L, A>): <RC>(
      config: ByInterp<PrimitiveNullableConfig<RC, L, A>, URIS | URIS2>
    ) => HKT2<F, R & RC, null | L, Option<A>>
  }
  boolean: {
    (): isOptionalConfig<PrimitiveBooleanConfig<NoEnv>, HKT2<F, NoEnv, boolean, boolean>>
  }
  booleanCfg: {
    <RC>(config: ByInterp<PrimitiveBooleanConfig<RC>, URIS | URIS2>): HKT2<F, RC, boolean, boolean>
  }
  number: {
    (): isOptionalConfig<PrimitiveNumberConfig<NoEnv>, HKT2<F, NoEnv, number, number>>
  }
  numberCfg: {
    <RC>(config: ByInterp<PrimitiveNumberConfig<RC>, URIS | URIS2>): HKT2<F, RC, number, number>
  }
  bigint: {
    (): isOptionalConfig<PrimitiveBigIntConfig<NoEnv>, HKT2<F, NoEnv, string, bigint>>
  }
  bigintCfg: {
    <RC>(config: ByInterp<PrimitiveBigIntConfig<RC>, URIS | URIS2>): HKT2<F, RC, string, bigint>
  }
  string: {
    (): isOptionalConfig<PrimitiveStringConfig<NoEnv>, HKT2<F, NoEnv, string, string>>
  }
  stringCfg: {
    <RC>(config: ByInterp<PrimitiveStringConfig<RC>, URIS | URIS2>): HKT2<F, RC, string, string>
  }
  stringLiteral: {
    <T extends string>(value: T): isOptionalConfig<
      PrimitiveStringLiteralConfig<NoEnv, T>,
      HKT2<F, NoEnv, string, typeof value>
    >
  }
  stringLiteralCfg: {
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
  }
  keysOfCfg: {
    <K extends Keys, RC>(keys: K, config: ByInterp<PrimitiveKeysOfConfig<RC, keyof K>, URIS | URIS2>): HKT2<
      F,
      RC,
      string,
      keyof typeof keys
    >
  }
  array: {
    <L, A, R>(a: HKT2<F, R, L, A>): isOptionalConfig<PrimitiveArrayConfig<NoEnv, L, A>, HKT2<F, R, Array<L>, Array<A>>>
  }
  arrayCfg: {
    <L, A, R>(a: HKT2<F, R, L, A>): <RC>(
      config: ByInterp<PrimitiveArrayConfig<RC, L, A>, URIS | URIS2>
    ) => HKT2<F, R & RC, Array<L>, Array<A>>
  }
  date: {
    (): isOptionalConfig<PrimitiveDateConfig<NoEnv>, HKT2<F, NoEnv, string, Date>>
  }
  dateCfg: {
    <RC>(config: ByInterp<PrimitiveDateConfig<RC>, URIS | URIS2>): HKT2<F, RC, string, Date>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraPrimitive1<F extends URIS> {
  _F: F
  nullable: <A, R>(T: Kind<F, R, A>) => Kind<F, R, Option<A>>
  nullableCfg: <A, R>(
    T: Kind<F, R, A>
  ) => <RC>(config: ByInterp<PrimitiveNullableConfig<RC, never, A>, F>) => Kind<F, R & RC, Option<A>>
  boolean(): Kind<F, NoEnv, boolean>
  booleanCfg<RC>(config: ByInterp<PrimitiveBooleanConfig<RC>, F>): Kind<F, RC, boolean>
  number(): Kind<F, NoEnv, number>
  numberCfg<RC>(config: ByInterp<PrimitiveNumberConfig<RC>, F>): Kind<F, RC, number>
  bigint(): Kind<F, NoEnv, bigint>
  bigintCfg<RC>(config: ByInterp<PrimitiveBigIntConfig<RC>, F>): Kind<F, RC, bigint>
  string(): Kind<F, NoEnv, string>
  stringCfg<RC>(config: ByInterp<PrimitiveStringConfig<RC>, F>): Kind<F, RC, string>
  stringLiteral: <T extends string>(value: T) => Kind<F, NoEnv, typeof value>
  stringLiteralCfg: <T extends string, RC>(
    value: T,
    config: ByInterp<PrimitiveStringLiteralConfig<RC, T>, F>
  ) => Kind<F, RC, typeof value>
  keysOf: <K extends Keys>(keys: K) => Kind<F, NoEnv, keyof typeof keys>
  keysOfCfg: <K extends Keys, RC>(
    keys: K,
    config: ByInterp<PrimitiveKeysOfConfig<RC, keyof K>, F>
  ) => Kind<F, RC, keyof typeof keys>
  array: <A, R>(a: Kind<F, R, A>) => Kind<F, R, Array<A>>
  arrayCfg: <A, R>(
    a: Kind<F, R, A>
  ) => <RC>(config: ByInterp<PrimitiveArrayConfig<RC, never, A>, F>) => Kind<F, R & RC, Array<A>>
  date(): Kind<F, NoEnv, Date>
  dateCfg<RC>(config: ByInterp<PrimitiveDateConfig<RC>, F>): Kind<F, RC, Date>
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraPrimitive2<F extends URIS2> {
  _F: F
  nullable: <L, A, R>(T: Kind2<F, R, L, A>) => Kind2<F, R, null | L, Option<A>>
  nullableCfg: <L, A, R>(
    T: Kind2<F, R, L, A>
  ) => <RC>(config: ByInterp<PrimitiveNullableConfig<RC, L, A>, F>) => Kind2<F, R & RC, null | L, Option<A>>
  boolean(): Kind2<F, NoEnv, boolean, boolean>
  booleanCfg<RC>(config: ByInterp<PrimitiveBooleanConfig<RC>, F>): Kind2<F, RC, boolean, boolean>
  number(): Kind2<F, NoEnv, number, number>
  numberCfg<RC>(config: ByInterp<PrimitiveNumberConfig<RC>, F>): Kind2<F, RC, number, number>
  bigint(): Kind2<F, NoEnv, string, bigint>
  bigintCfg<RC>(config: ByInterp<PrimitiveBigIntConfig<RC>, F>): Kind2<F, RC, string, bigint>
  string(): Kind2<F, NoEnv, string, string>
  stringCfg<RC>(config: ByInterp<PrimitiveStringConfig<RC>, F>): Kind2<F, RC, string, string>
  stringLiteral: <T extends string>(value: T) => Kind2<F, NoEnv, string, typeof value>
  stringLiteralCfg: <T extends string, RC>(
    value: T,
    config: ByInterp<PrimitiveStringLiteralConfig<RC, T>, F>
  ) => Kind2<F, RC, string, typeof value>
  keysOf: <K extends Keys>(keys: K) => Kind2<F, NoEnv, string, keyof typeof keys>
  keysOfCfg: <K extends Keys, RC>(
    keys: K,
    config: ByInterp<PrimitiveKeysOfConfig<RC, keyof K>, F>
  ) => Kind2<F, RC, string, keyof typeof keys>
  array: <L, A, R>(a: Kind2<F, R, L, A>) => Kind2<F, R, Array<L>, Array<A>>
  arrayCfg: <L, A, R>(
    a: Kind2<F, R, L, A>
  ) => <RC>(config: ByInterp<PrimitiveArrayConfig<RC, L, A>, F>) => Kind2<F, R & RC, Array<L>, Array<A>>
  date(): Kind2<F, NoEnv, string, Date>
  dateCfg<RC>(config: ByInterp<PrimitiveDateConfig<RC>, F>): Kind2<F, RC, string, Date>
}

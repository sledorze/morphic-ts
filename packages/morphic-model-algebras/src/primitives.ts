import { Option } from 'fp-ts/lib/Option'
import { URIS2, Kind2, URIS, Kind, HKT2 } from '@morphic-ts/common/lib/HKT'
import { NoEnv, ConfigsForType, AnyEnv } from '@morphic-ts/common/lib/config'

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
  export interface Algebra<F, Env> {
    [PrimitiveURI]: ModelAlgebraPrimitive<F, Env>
  }
  export interface Algebra1<F extends URIS, Env extends AnyEnv> {
    [PrimitiveURI]: ModelAlgebraPrimitive1<F, Env>
  }
  export interface Algebra2<F extends URIS2, Env extends AnyEnv> {
    [PrimitiveURI]: ModelAlgebraPrimitive2<F, Env>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraPrimitive<F, Env> {
  _F: F
  nullable: {
    <L, A>(T: HKT2<F, Env, L, A>): HKT2<F, Env, null | L, Option<A>>
  }
  nullableCfg: {
    <L, A>(T: HKT2<F, Env, L, A>): <C extends ConfigsForType<Env, L | null, Option<A>>>(
      config: C
    ) => HKT2<F, Env, null | L, Option<A>>
  }
  boolean: HKT2<F, NoEnv, boolean, boolean>
  booleanCfg: {
    <C extends ConfigsForType<Env, boolean, boolean>>(config: C): HKT2<F, Env, boolean, boolean>
  }
  number: HKT2<F, NoEnv, number, number>
  numberCfg: {
    <C extends ConfigsForType<Env, number, number>>(config: C): HKT2<F, Env, number, number>
  }
  bigint: HKT2<F, NoEnv, string, bigint>
  bigintCfg: {
    <C extends ConfigsForType<Env, string, bigint>>(config: C): HKT2<F, Env, string, bigint>
  }
  string: HKT2<F, NoEnv, string, string>

  stringCfg: {
    <C extends ConfigsForType<Env, string, string>>(config: C): HKT2<F, Env, string, string>
  }
  stringLiteral: {
    <T extends string>(value: T): HKT2<F, NoEnv, string, typeof value>
  }
  stringLiteralCfg: {
    <T extends string>(value: T): <C extends ConfigsForType<Env, string, T>>(
      config: C
    ) => HKT2<F, Env, string, typeof value>
  }
  keysOf: {
    <K extends Keys>(keys: K): HKT2<F, NoEnv, string, keyof typeof keys>
  }
  keysOfCfg: {
    <K extends Keys>(keys: K): <C extends ConfigsForType<Env, string, keyof K>>(
      config: C
    ) => HKT2<F, Env, string, keyof typeof keys>
  }
  array: {
    <L, A>(a: HKT2<F, Env, L, A>): HKT2<F, Env, Array<L>, Array<A>>
  }
  arrayCfg: {
    <L, A>(a: HKT2<F, Env, L, A>): <C extends ConfigsForType<Env, Array<L>, Array<A>>>(
      config: C
    ) => HKT2<F, Env, Array<L>, Array<A>>
  }
  date: HKT2<F, NoEnv, string, Date>
  dateCfg: {
    <C extends ConfigsForType<Env, string, Date>>(config: C): HKT2<F, Env, string, Date>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraPrimitive1<F extends URIS, Env extends AnyEnv> {
  _F: F
  nullable: <A>(T: Kind<F, Env, A>) => Kind<F, Env, Option<A>>
  nullableCfg: <A>(
    T: Kind<F, Env, A>
  ) => <C extends ConfigsForType<Env, null | A, Option<A>>>(config: C) => Kind<F, Env, Option<A>>
  boolean: Kind<F, NoEnv, boolean>
  booleanCfg<C extends ConfigsForType<Env, boolean, boolean>>(config: C): Kind<F, Env, boolean>
  number: Kind<F, NoEnv, number>
  numberCfg<C extends ConfigsForType<Env, number, number>>(config: C): Kind<F, Env, number>
  bigint: Kind<F, NoEnv, bigint>
  bigintCfg<C extends ConfigsForType<Env, string, bigint>>(config: C): Kind<F, Env, bigint>
  string: Kind<F, NoEnv, string>
  stringCfg<C extends ConfigsForType<Env, string, string>>(config: C): Kind<F, Env, string>
  stringLiteral: <T extends string>(value: T) => Kind<F, NoEnv, typeof value>
  stringLiteralCfg: <T extends string>(
    value: T
  ) => <C extends ConfigsForType<Env, string, T>>(config: C) => Kind<F, Env, typeof value>
  keysOf: <K extends Keys>(keys: K) => Kind<F, NoEnv, keyof typeof keys>
  keysOfCfg: <K extends Keys>(
    keys: K
  ) => <C extends ConfigsForType<Env, string, keyof K>>(config: C) => Kind<F, Env, keyof typeof keys>
  array: <A>(a: Kind<F, Env, A>) => Kind<F, Env, Array<A>>
  arrayCfg: <A>(
    a: Kind<F, Env, A>
  ) => <C extends ConfigsForType<Env, unknown[], A[]>>(config: C) => Kind<F, Env, Array<A>>
  date: Kind<F, NoEnv, Date>
  dateCfg<C extends ConfigsForType<Env, string, Date>>(config: C): Kind<F, Env, Date>
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraPrimitive2<F extends URIS2, Env extends AnyEnv> {
  _F: F
  nullable: <L, A>(T: Kind2<F, Env, L, A>) => Kind2<F, Env, null | L, Option<A>>
  nullableCfg: <L, A>(
    T: Kind2<F, Env, L, A>
  ) => <C extends ConfigsForType<Env, null | L, Option<A>>>(config: C) => Kind2<F, Env, null | L, Option<A>>
  boolean: Kind2<F, NoEnv, boolean, boolean>
  booleanCfg<C extends ConfigsForType<Env, boolean, boolean>>(config: C): Kind2<F, Env, boolean, boolean>
  number: Kind2<F, NoEnv, number, number>
  numberCfg<C extends ConfigsForType<Env, number, number>>(config: C): Kind2<F, Env, number, number>
  bigint: Kind2<F, NoEnv, string, bigint>
  bigintCfg<C extends ConfigsForType<Env, string, bigint>>(config: C): Kind2<F, Env, string, bigint>
  string: Kind2<F, NoEnv, string, string>
  stringCfg<C extends ConfigsForType<Env, string, string>>(config: C): Kind2<F, Env, string, string>
  stringLiteral: <T extends string>(value: T) => Kind2<F, NoEnv, string, typeof value>
  stringLiteralCfg: <T extends string>(
    value: T
  ) => <C extends ConfigsForType<Env, string, T>>(config: C) => Kind2<F, Env, string, typeof value>
  keysOf: <K extends Keys>(keys: K) => Kind2<F, NoEnv, string, keyof typeof keys>
  keysOfCfg: <K extends Keys>(
    keys: K
  ) => <C extends ConfigsForType<Env, string, keyof K>>(config: C) => Kind2<F, Env, string, keyof typeof keys>
  array: <L, A>(a: Kind2<F, Env, L, A>) => Kind2<F, Env, Array<L>, Array<A>>
  arrayCfg: <L, A>(
    a: Kind2<F, Env, L, A>
  ) => <C extends ConfigsForType<Env, Array<L>, Array<A>>>(config: C) => Kind2<F, Env, Array<L>, Array<A>>
  date: Kind2<F, NoEnv, string, Date>
  dateCfg<C extends ConfigsForType<Env, string, Date>>(config: C): Kind2<F, Env, string, Date>
}

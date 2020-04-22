import { Option } from 'fp-ts/lib/Option'
import { URIS2, Kind2, URIS, Kind, HKT2 } from '@morphic-ts/common/lib/HKT'
import { ConfigsForType, AnyEnv } from '@morphic-ts/common/lib/config'

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
    <L, A>(T: HKT2<F, Env, L, A>): (
      config: ConfigsForType<Env, L | null, Option<A>>
    ) => HKT2<F, Env, null | L, Option<A>>
  }
  boolean: HKT2<F, Env, boolean, boolean>
  booleanCfg: {
    (config: ConfigsForType<Env, boolean, boolean>): HKT2<F, Env, boolean, boolean>
  }
  number: HKT2<F, Env, number, number>
  numberCfg: {
    (config: ConfigsForType<Env, number, number>): HKT2<F, Env, number, number>
  }
  bigint: HKT2<F, Env, string, bigint>
  bigintCfg: {
    (config: ConfigsForType<Env, string, bigint>): HKT2<F, Env, string, bigint>
  }
  string: HKT2<F, Env, string, string>

  stringCfg: {
    (config: ConfigsForType<Env, string, string>): HKT2<F, Env, string, string>
  }
  stringLiteral: {
    <T extends string>(value: T): HKT2<F, Env, string, typeof value>
  }
  stringLiteralCfg: {
    <T extends string>(value: T): (config: ConfigsForType<Env, string, T>) => HKT2<F, Env, string, typeof value>
  }
  keysOf: {
    <K extends Keys>(keys: K): HKT2<F, Env, string, keyof typeof keys>
  }
  keysOfCfg: {
    <K extends Keys>(keys: K): (config: ConfigsForType<Env, string, keyof K>) => HKT2<F, Env, string, keyof typeof keys>
  }
  array: {
    <L, A>(a: HKT2<F, Env, L, A>): HKT2<F, Env, Array<L>, Array<A>>
  }
  arrayCfg: {
    <L, A>(a: HKT2<F, Env, L, A>): (config: ConfigsForType<Env, Array<L>, Array<A>>) => HKT2<F, Env, Array<L>, Array<A>>
  }
  date: HKT2<F, Env, string, Date>
  dateCfg: {
    (config: ConfigsForType<Env, string, Date>): HKT2<F, Env, string, Date>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraPrimitive1<F extends URIS, Env extends AnyEnv> {
  _F: F
  nullable: <A>(T: Kind<F, Env, A>) => Kind<F, Env, Option<A>>
  nullableCfg: <A>(T: Kind<F, Env, A>) => (config: ConfigsForType<Env, null | A, Option<A>>) => Kind<F, Env, Option<A>>
  boolean: Kind<F, Env, boolean>
  booleanCfg(config: ConfigsForType<Env, boolean, boolean>): Kind<F, Env, boolean>
  number: Kind<F, Env, number>
  numberCfg(config: ConfigsForType<Env, number, number>): Kind<F, Env, number>
  bigint: Kind<F, Env, bigint>
  bigintCfg(config: ConfigsForType<Env, string, bigint>): Kind<F, Env, bigint>
  string: Kind<F, Env, string>
  stringCfg(config: ConfigsForType<Env, string, string>): Kind<F, Env, string>
  stringLiteral: <T extends string>(value: T) => Kind<F, Env, typeof value>
  stringLiteralCfg: <T extends string>(
    value: T
  ) => (config: ConfigsForType<Env, string, T>) => Kind<F, Env, typeof value>
  keysOf: <K extends Keys>(keys: K) => Kind<F, Env, keyof typeof keys>
  keysOfCfg: <K extends Keys>(
    keys: K
  ) => (config: ConfigsForType<Env, string, keyof K>) => Kind<F, Env, keyof typeof keys>
  array: <A>(a: Kind<F, Env, A>) => Kind<F, Env, Array<A>>
  arrayCfg: <A>(a: Kind<F, Env, A>) => (config: ConfigsForType<Env, unknown[], A[]>) => Kind<F, Env, Array<A>>
  date: Kind<F, Env, Date>
  dateCfg(config: ConfigsForType<Env, string, Date>): Kind<F, Env, Date>
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraPrimitive2<F extends URIS2, Env extends AnyEnv> {
  _F: F
  nullable: <L, A>(T: Kind2<F, Env, L, A>) => Kind2<F, Env, null | L, Option<A>>
  nullableCfg: <L, A>(
    T: Kind2<F, Env, L, A>
  ) => (config: ConfigsForType<Env, null | L, Option<A>>) => Kind2<F, Env, null | L, Option<A>>
  boolean: Kind2<F, Env, boolean, boolean>
  booleanCfg(config: ConfigsForType<Env, boolean, boolean>): Kind2<F, Env, boolean, boolean>
  number: Kind2<F, Env, number, number>
  numberCfg(config: ConfigsForType<Env, number, number>): Kind2<F, Env, number, number>
  bigint: Kind2<F, Env, string, bigint>
  bigintCfg(config: ConfigsForType<Env, string, bigint>): Kind2<F, Env, string, bigint>
  string: Kind2<F, Env, string, string>
  stringCfg(config: ConfigsForType<Env, string, string>): Kind2<F, Env, string, string>
  stringLiteral: <T extends string>(value: T) => Kind2<F, Env, string, typeof value>
  stringLiteralCfg: <T extends string>(
    value: T
  ) => (config: ConfigsForType<Env, string, T>) => Kind2<F, Env, string, typeof value>
  keysOf: <K extends Keys>(keys: K) => Kind2<F, Env, string, keyof typeof keys>
  keysOfCfg: <K extends Keys>(
    keys: K
  ) => (config: ConfigsForType<Env, string, keyof K>) => Kind2<F, Env, string, keyof typeof keys>
  array: <L, A>(a: Kind2<F, Env, L, A>) => Kind2<F, Env, Array<L>, Array<A>>
  arrayCfg: <L, A>(
    a: Kind2<F, Env, L, A>
  ) => (config: ConfigsForType<Env, Array<L>, Array<A>>) => Kind2<F, Env, Array<L>, Array<A>>
  date: Kind2<F, Env, string, Date>
  dateCfg(config: ConfigsForType<Env, string, Date>): Kind2<F, Env, string, Date>
}

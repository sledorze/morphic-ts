import { Option } from 'fp-ts/lib/Option'
import { URIS2, Kind2, URIS, Kind, HKT2 } from '@morphic-ts/common/lib/HKT'
import { NoEnv, ConfigsEnvs, ConfigsForType } from '@morphic-ts/common/lib/config'

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
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraPrimitive<F> {
  _F: F
  nullable: {
    <L, A, R>(T: HKT2<F, R, L, A>): HKT2<F, R, null | L, Option<A>>
  }
  nullableCfg: {
    <L, A, R>(T: HKT2<F, R, L, A>): <C extends ConfigsForType<L, A>>(
      config: C
    ) => HKT2<F, R & ConfigsEnvs<C>, null | L, Option<A>>
  }
  boolean: {
    (): HKT2<F, NoEnv, boolean, boolean>
  }
  booleanCfg: {
    <C extends ConfigsForType<boolean, boolean>>(config: C): HKT2<F, ConfigsEnvs<C>, boolean, boolean>
  }
  number: {
    (): HKT2<F, NoEnv, number, number>
  }
  numberCfg: {
    <C extends ConfigsForType<number, number>>(config: C): HKT2<F, ConfigsEnvs<C>, number, number>
  }
  bigint: {
    (): HKT2<F, NoEnv, string, bigint>
  }
  bigintCfg: {
    <C extends ConfigsForType<string, bigint>>(config: C): HKT2<F, ConfigsEnvs<C>, string, bigint>
  }
  string: {
    (): HKT2<F, NoEnv, string, string>
  }
  stringCfg: {
    <C extends ConfigsForType<string, string>>(config: C): HKT2<F, ConfigsEnvs<C>, string, string>
  }
  stringLiteral: {
    <T extends string>(value: T): HKT2<F, NoEnv, string, typeof value>
  }
  stringLiteralCfg: {
    <T extends string>(value: T): <C extends ConfigsForType<string, T>>(
      config: C
    ) => HKT2<F, ConfigsEnvs<C>, string, typeof value>
  }
  keysOf: {
    <K extends Keys>(keys: K): HKT2<F, NoEnv, string, keyof typeof keys>
  }
  keysOfCfg: {
    <K extends Keys>(keys: K): <C extends ConfigsForType<string, keyof K>>(
      config: C
    ) => HKT2<F, ConfigsEnvs<C>, string, keyof typeof keys>
  }
  array: {
    <L, A, R>(a: HKT2<F, R, L, A>): HKT2<F, R, Array<L>, Array<A>>
  }
  arrayCfg: {
    <L, A, R>(a: HKT2<F, R, L, A>): <C extends ConfigsForType<L, A>>(
      config: C
    ) => HKT2<F, R & ConfigsEnvs<typeof config>, Array<L>, Array<A>>
  }
  date: {
    (): HKT2<F, NoEnv, string, Date>
  }
  dateCfg: {
    <C extends ConfigsForType<string, Date>>(config: C): HKT2<F, ConfigsEnvs<C>, string, Date>
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
  ) => <C extends ConfigsForType<null | A, Option<A>>>(config: C) => Kind<F, R & ConfigsEnvs<C>, Option<A>>
  boolean(): Kind<F, NoEnv, boolean>
  booleanCfg<C extends ConfigsForType<boolean, boolean>>(config: C): Kind<F, ConfigsEnvs<C>, boolean>
  number(): Kind<F, NoEnv, number>
  numberCfg<C extends ConfigsForType<number, number>>(config: C): Kind<F, ConfigsEnvs<C>, number>
  bigint(): Kind<F, NoEnv, bigint>
  bigintCfg<C extends ConfigsForType<string, bigint>>(config: C): Kind<F, ConfigsEnvs<C>, bigint>
  string(): Kind<F, NoEnv, string>
  stringCfg<C extends ConfigsForType<string, string>>(config: C): Kind<F, ConfigsEnvs<C>, string>
  stringLiteral: <T extends string>(value: T) => Kind<F, NoEnv, typeof value>
  stringLiteralCfg: <T extends string>(
    value: T
  ) => <C extends ConfigsForType<string, T>>(config: C) => Kind<F, ConfigsEnvs<C>, typeof value>
  keysOf: <K extends Keys>(keys: K) => Kind<F, NoEnv, keyof typeof keys>
  keysOfCfg: <K extends Keys>(
    keys: K
  ) => <C extends ConfigsForType<string, keyof K>>(config: C) => Kind<F, ConfigsEnvs<C>, keyof typeof keys>
  array: <A, R>(a: Kind<F, R, A>) => Kind<F, R, Array<A>>
  arrayCfg: <A, R>(
    a: Kind<F, R, A>
  ) => <C extends ConfigsForType<unknown[], A[]>>(config: C) => Kind<F, R & ConfigsEnvs<C>, Array<A>>
  date(): Kind<F, NoEnv, Date>
  dateCfg<C extends ConfigsForType<string, Date>>(config: C): Kind<F, ConfigsEnvs<C>, Date>
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraPrimitive2<F extends URIS2> {
  _F: F
  nullable: <L, A, R>(T: Kind2<F, R, L, A>) => Kind2<F, R, null | L, Option<A>>
  nullableCfg: <L, A, R>(
    T: Kind2<F, R, L, A>
  ) => <C extends ConfigsForType<null | L, Option<A>>>(config: C) => Kind2<F, R & ConfigsEnvs<C>, null | L, Option<A>>
  boolean(): Kind2<F, NoEnv, boolean, boolean>
  booleanCfg<C extends ConfigsForType<boolean, boolean>>(config: C): Kind2<F, ConfigsEnvs<C>, boolean, boolean>
  number(): Kind2<F, NoEnv, number, number>
  numberCfg<C extends ConfigsForType<number, number>>(config: C): Kind2<F, ConfigsEnvs<C>, number, number>
  bigint(): Kind2<F, NoEnv, string, bigint>
  bigintCfg<C extends ConfigsForType<string, bigint>>(config: C): Kind2<F, ConfigsEnvs<C>, string, bigint>
  string(): Kind2<F, NoEnv, string, string>
  stringCfg<C extends ConfigsForType<string, string>>(config: C): Kind2<F, ConfigsEnvs<C>, string, string>
  stringLiteral: <T extends string>(value: T) => Kind2<F, NoEnv, string, typeof value>
  stringLiteralCfg: <T extends string>(
    value: T
  ) => <C extends ConfigsForType<string, T>>(config: C) => Kind2<F, ConfigsEnvs<C>, string, typeof value>
  keysOf: <K extends Keys>(keys: K) => Kind2<F, NoEnv, string, keyof typeof keys>
  keysOfCfg: <K extends Keys>(
    keys: K
  ) => <C extends ConfigsForType<string, keyof K>>(config: C) => Kind2<F, ConfigsEnvs<C>, string, keyof typeof keys>
  array: <L, A, R>(a: Kind2<F, R, L, A>) => Kind2<F, R, Array<L>, Array<A>>
  arrayCfg: <L, A, R>(
    a: Kind2<F, R, L, A>
  ) => <C extends ConfigsForType<Array<L>, Array<A>>>(config: C) => Kind2<F, R & ConfigsEnvs<C>, Array<L>, Array<A>>
  date(): Kind2<F, NoEnv, string, Date>
  dateCfg<C extends ConfigsForType<string, Date>>(config: C): Kind2<F, ConfigsEnvs<C>, string, Date>
}

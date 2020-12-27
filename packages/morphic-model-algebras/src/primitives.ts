import type { AnyEnv, ConfigsForType } from '@morphic-ts/common/lib/config'
import type { Kind, URIS } from '@morphic-ts/common/lib/HKT'
import type { Either } from 'fp-ts/Either'
import type { Option } from 'fp-ts/Option'
import type { ReadonlyNonEmptyArray } from 'fp-ts/ReadonlyNonEmptyArray'
import type { UUID } from 'io-ts-types/lib/UUID'

import type { Array, Mutable } from './types'
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
  export interface Algebra<F extends URIS, Env extends AnyEnv> {
    [PrimitiveURI]: ModelAlgebraPrimitive<F, Env>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraPrimitive<F extends URIS, Env extends AnyEnv> {
  _F: F
  nullable: <L, A>(
    T: Kind<F, Env, L, A>,
    config?: ConfigsForType<Env, null | L, Option<A>>
  ) => Kind<F, Env, null | L, Option<A>>
  boolean(config?: ConfigsForType<Env, boolean, boolean>): Kind<F, Env, boolean, boolean>
  number(config?: ConfigsForType<Env, number, number>): Kind<F, Env, number, number>
  bigint(config?: ConfigsForType<Env, string, bigint>): Kind<F, Env, string, bigint>
  string(config?: ConfigsForType<Env, string, string>): Kind<F, Env, string, string>
  stringLiteral: <T extends string>(
    value: T,
    config?: ConfigsForType<Env, string, T>
  ) => Kind<F, Env, string, typeof value>
  tag: <T extends string>(value: T, config?: ConfigsForType<Env, undefined, T>) => Kind<F, Env, undefined, typeof value>
  keysOf: <K extends Keys>(
    keys: K,
    config?: ConfigsForType<Env, string, keyof K>
  ) => Kind<F, Env, string, keyof typeof keys>
  mutable: <L, A>(
    a: Kind<F, Env, L, A>,
    config?: ConfigsForType<Env, Mutable<L>, Mutable<A>>
  ) => Kind<F, Env, Mutable<L>, Mutable<A>>
  array: <L, A>(
    a: Kind<F, Env, L, A>,
    config?: ConfigsForType<Env, Array<L>, Array<A>>
  ) => Kind<F, Env, Array<L>, Array<A>>
  nonEmptyArray: <L, A>(
    a: Kind<F, Env, L, A>,
    config?: ConfigsForType<Env, Array<L>, ReadonlyNonEmptyArray<A>>
  ) => Kind<F, Env, Array<L>, ReadonlyNonEmptyArray<A>>
  date(config?: ConfigsForType<Env, string, Date>): Kind<F, Env, string, Date>
  uuid(config?: ConfigsForType<Env, string, UUID>): Kind<F, Env, string, UUID>
  either: <EE, EA, AE, AA>(
    e: Kind<F, Env, EE, EA>,
    a: Kind<F, Env, AE, AA>,
    config?: ConfigsForType<Env, Either<EE, AE>, Either<EA, AA>>
  ) => Kind<F, Env, Either<EE, AE>, Either<EA, AA>>
  option: {
    <E, A>(a: Kind<F, Env, E, A>, config?: ConfigsForType<Env, Option<E>, Option<A>>): Kind<
      F,
      Env,
      Option<E>,
      Option<A>
    >
  }
}

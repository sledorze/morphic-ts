import type { AnyEnv, ConfigsForType, Named } from '@morphic-ts/common/lib/config'
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
 * @since 0.0.1
 */
export type LiteralT = string | number

/**
 * @since 0.0.1
 */
export interface NonEmptyArrayConfig<L, A> {}

/**
 * @since 0.0.1
 */
export interface ArrayConfig<L, A> {}

/**
 * @since 0.0.1
 */
export interface NullableConfig<L, A> {}

/**
 * @since 0.0.1
 */

export interface MutableConfig<L, A> {}
/**
 * @since 0.0.1
 */

export interface NumberLiteralConfig<T> {}
/**
 * @since 0.0.1
 */

export interface OneOfLiteralsConfig<T> {}
/**
 * @since 0.0.1
 */

export interface EitherConfig<EE, EA, AE, AA> {}
/**
 * @since 0.0.1
 */

export interface OptionConfig<L, A> {}
/**
 * @since 0.0.1
 */

export interface BooleanConfig {}
/**
 * @since 0.0.1
 */

export interface NumberConfig {}
/**
 * @since 0.0.1
 */

export interface BigIntConfig {}
/**
 * @since 0.0.1
 */

export interface StringConfig {}
/**
 * @since 0.0.1
 */

export interface StringLiteralConfig<T> {}
/**
 * @since 0.0.1
 */

export interface TagConfig<T> {}
/**
 * @since 0.0.1
 */

export interface KeysOfConfig<K> {}
/**
 * @since 0.0.1
 */

export interface DateConfig {}
/**
 * @since 0.0.1
 */

export interface UUIDConfig {}
/**
 * @since 0.0.1
 */

export interface UnknownEConfig<L, A> {}
/**
 * @since 0.0.1
 */

export interface OptionalConfig<L, A> {}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraPrimitive<F extends URIS, Env extends AnyEnv> {
  _F: F
  nullable: <L, A>(
    T: Kind<F, Env, L, A>,
    config?: Named<ConfigsForType<Env, null | L, Option<A>, NullableConfig<L, A>>>
  ) => Kind<F, Env, null | L, Option<A>>
  boolean(config?: Named<ConfigsForType<Env, boolean, boolean, BooleanConfig>>): Kind<F, Env, boolean, boolean>
  number(config?: Named<ConfigsForType<Env, number, number, NumberConfig>>): Kind<F, Env, number, number>
  bigint(config?: Named<ConfigsForType<Env, string, bigint, BigIntConfig>>): Kind<F, Env, string, bigint>
  string(config?: Named<ConfigsForType<Env, string, string, StringConfig>>): Kind<F, Env, string, string>
  stringLiteral: <T extends string>(
    value: T,
    config?: Named<ConfigsForType<Env, string, T, StringLiteralConfig<T>>>
  ) => Kind<F, Env, string, typeof value>
  numberLiteral: <T extends number>(
    value: T,
    config?: Named<ConfigsForType<Env, number, T, NumberLiteralConfig<T>>>
  ) => Kind<F, Env, number, typeof value>

  oneOfLiterals: <T extends readonly [LiteralT, ...LiteralT[]]>(
    value: T,
    config?: Named<ConfigsForType<Env, LiteralT, T[number], OneOfLiteralsConfig<T[number]>>>
  ) => Kind<F, Env, LiteralT, T[number]>

  tag: <T extends string>(
    value: T,
    config?: Named<ConfigsForType<Env, undefined, T, TagConfig<T>>>
  ) => Kind<F, Env, undefined, typeof value>
  keysOf: <K extends Keys>(
    keys: K,
    config?: Named<ConfigsForType<Env, string, keyof K, KeysOfConfig<K>>>
  ) => Kind<F, Env, string, keyof typeof keys>
  mutable: <L, A>(
    a: Kind<F, Env, L, A>,
    config?: Named<ConfigsForType<Env, Mutable<L>, Mutable<A>, MutableConfig<L, A>>>
  ) => Kind<F, Env, Mutable<L>, Mutable<A>>
  array: <L, A>(
    a: Kind<F, Env, L, A>,
    config?: Named<ConfigsForType<Env, Array<L>, Array<A>, ArrayConfig<L, A>>>
  ) => Kind<F, Env, Array<L>, Array<A>>
  nonEmptyArray: <L, A>(
    a: Kind<F, Env, L, A>,
    config?: Named<ConfigsForType<Env, Array<L>, ReadonlyNonEmptyArray<A>, NonEmptyArrayConfig<L, A>>>
  ) => Kind<F, Env, Array<L>, ReadonlyNonEmptyArray<A>>
  date(config?: Named<ConfigsForType<Env, string, Date, DateConfig>>): Kind<F, Env, string, Date>
  uuid(config?: Named<ConfigsForType<Env, string, UUID, UUIDConfig>>): Kind<F, Env, string, UUID>
  either: <EE, EA, AE, AA>(
    e: Kind<F, Env, EE, EA>,
    a: Kind<F, Env, AE, AA>,
    config?: Named<ConfigsForType<Env, Either<EE, AE>, Either<EA, AA>, EitherConfig<EE, EA, AE, AA>>>
  ) => Kind<F, Env, Either<EE, AE>, Either<EA, AA>>
  optional: {
    <E, A>(
      a: Kind<F, Env, E, A>,
      config?: Named<ConfigsForType<Env, E | undefined, A | undefined, OptionConfig<E, A>>>
    ): Kind<F, Env, E | undefined, A | undefined>
  }
  option: {
    <E, A>(a: Kind<F, Env, E, A>, config?: Named<ConfigsForType<Env, Option<E>, Option<A>, OptionConfig<E, A>>>): Kind<
      F,
      Env,
      Option<E>,
      Option<A>
    >
  }
  unknownE: {
    <L, A>(T: Kind<F, Env, L, A>, config?: Named<ConfigsForType<Env, unknown, A, UnknownEConfig<L, A>>>): Kind<
      F,
      Env,
      unknown,
      A
    >
  }
}

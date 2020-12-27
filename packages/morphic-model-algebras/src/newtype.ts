import type { AnyEnv, ConfigsForType } from '@morphic-ts/common/lib/config'
import type { Kind, URIS } from '@morphic-ts/common/lib/HKT'
import type { Newtype } from 'newtype-ts'
/**
 *  @since 0.0.1
 */
export const NewtypeURI = 'NewtypeURI' as const
/**
 *  @since 0.0.1
 */
export type NewtypeURI = typeof NewtypeURI

declare module '@morphic-ts/algebras/lib/hkt' {
  export interface Algebra<F extends URIS, Env extends AnyEnv> {
    [NewtypeURI]: ModelAlgebraNewtype<F, Env>
  }
}

/**
 *  @since 0.0.1
 */
export type AnyNewtype = Newtype<any, any>

/**
 *  @since 0.0.1
 */
export type NewtypeA<N extends AnyNewtype> = N extends Newtype<any, infer A> ? A : never

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraNewtype<F extends URIS, Env> {
  _F: F
  newtype<N extends AnyNewtype = never>(
    name: string // on purpose type relaxation `Kind<F, R, N>` instead of `Kind<F, R, NewtypeA<N>>`
  ): <E>(a: Kind<F, Env, E, NewtypeA<N>>, config?: ConfigsForType<Env, E, N>) => Kind<F, Env, E, N>
}

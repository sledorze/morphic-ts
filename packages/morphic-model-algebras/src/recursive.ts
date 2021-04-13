import type { AnyEnv, ConfigsForType, Named } from '@morphic-ts/common/lib/config'
import type { Kind, URIS } from '@morphic-ts/common/lib/HKT'

/**
 *  @since 0.0.1
 */
export const RecursiveURI = 'RecursiveURI' as const
/**
 *  @since 0.0.1
 */
export type RecursiveURI = typeof RecursiveURI

declare module '@morphic-ts/algebras/lib/hkt' {
  export interface Algebra<F extends URIS, Env extends AnyEnv> {
    [RecursiveURI]: ModelAlgebraRecursive<F, Env>
  }
}

/**
 * @since 0.0.1
 */
export interface RecursiveConfig<L, A> {}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraRecursive<F extends URIS, Env extends AnyEnv> {
  _F: F
  recursive: <L, A>(
    a: (x: Kind<F, Env, L, A>) => Kind<F, Env, L, A>,
    config?: Named<ConfigsForType<Env, L, A, RecursiveConfig<L, A>>>
  ) => Kind<F, Env, L, A>
}

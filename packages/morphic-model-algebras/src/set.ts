import type { AnyEnv } from '@morphic-ts/common/lib/config'
import type { Kind, URIS } from '@morphic-ts/common/lib/HKT'
import type { Ord } from 'fp-ts/Ord'

import type { Array } from './types'

/**
 *  @since 0.0.1
 */
export const SetURI = 'SetURI' as const
/**
 *  @since 0.0.1
 */
export type SetURI = typeof SetURI

declare module '@morphic-ts/algebras/lib/hkt' {
  export interface Algebra<F extends URIS, Env extends AnyEnv> {
    [SetURI]: ModelAlgebraSet<F, Env>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraSet<F extends URIS, Env extends AnyEnv> {
  _F: F
  set: <L, A>(a: Kind<F, Env, L, A>, ord: Ord<A>) => Kind<F, Env, Array<L>, Set<A>>
}

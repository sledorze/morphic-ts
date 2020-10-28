import type { Ord } from 'fp-ts/Ord'
import type { Kind, URIS, Kind2, URIS2, HKT2 } from '@morphic-ts/common/lib/HKT'
import type { AnyEnv } from '@morphic-ts/common/lib/config'

/**
 *  @since 0.0.1
 */
export const SetURI = 'SetURI' as const
/**
 *  @since 0.0.1
 */
export type SetURI = typeof SetURI

declare module '@morphic-ts/algebras/lib/hkt' {
  export interface Algebra<F, Env> {
    [SetURI]: ModelAlgebraSet<F, Env>
  }
  export interface Algebra1<F extends URIS, Env extends AnyEnv> {
    [SetURI]: ModelAlgebraSet1<F, Env>
  }
  export interface Algebra2<F extends URIS2, Env extends AnyEnv> {
    [SetURI]: ModelAlgebraSet2<F, Env>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraSet<F, Env> {
  _F: F
  set: <L, A>(a: HKT2<F, Env, L, A>, ord: Ord<A>) => HKT2<F, Env, Array<L>, Set<A>>
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraSet1<F extends URIS, Env extends AnyEnv> {
  _F: F
  set: <A>(a: Kind<F, Env, A>, ord: Ord<A>) => Kind<F, Env, Set<A>>
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraSet2<F extends URIS2, Env extends AnyEnv> {
  _F: F
  set: <L, A>(a: Kind2<F, Env, L, A>, ord: Ord<A>) => Kind2<F, Env, Array<L>, Set<A>>
}

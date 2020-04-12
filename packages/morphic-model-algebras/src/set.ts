import { Ord } from 'fp-ts/lib/Ord'
import { Kind, URIS, Kind2, URIS2, HKT2 } from '@morphic-ts/common/lib/HKT'

/**
 *  @since 0.0.1
 */
export const SetURI = 'SetURI' as const
/**
 *  @since 0.0.1
 */
export type SetURI = typeof SetURI

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraSet<F> {
  _F: F
  set: <R, L, A>(a: HKT2<F, R, L, A>, ord: Ord<A>) => HKT2<F, R, Array<L>, Set<A>>
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraSet1<F extends URIS> {
  _F: F
  set: <A, R>(a: Kind<F, R, A>, ord: Ord<A>) => Kind<F, R, Set<A>>
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraSet2<F extends URIS2> {
  _F: F
  set: <R, L, A>(a: Kind2<F, R, L, A>, ord: Ord<A>) => Kind2<F, R, Array<L>, Set<A>>
}

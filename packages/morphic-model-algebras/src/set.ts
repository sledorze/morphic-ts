import { Ord } from 'fp-ts/lib/Ord'
import { Kind, URIS, Kind2, URIS2, HKT2 } from '@sledorze/morphic-common/lib/HKT'

/**
 *  @since 0.0.1
 */
export const SetURI = Symbol()
/**
 *  @since 0.0.1
 */
export type SetURI = typeof SetURI

declare module '@sledorze/morphic-algebras/lib/hkt' {
  interface Algebra<F> {
    [SetURI]: ModelAlgebraSet<F>
  }
  interface Algebra1<F extends URIS> {
    [SetURI]: ModelAlgebraSet1<F>
  }
  interface Algebra2<F extends URIS2> {
    [SetURI]: ModelAlgebraSet2<F>
  }
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraSet<F> {
  _F: F
  set: <L, A>(a: HKT2<F, L, A>, ord: Ord<A>) => HKT2<F, Array<L>, Set<A>>
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraSet1<F extends URIS> {
  _F: F
  set: <A>(a: Kind<F, A>, ord: Ord<A>) => Kind<F, Set<A>>
}

/**
 *  @since 0.0.1
 */
export interface ModelAlgebraSet2<F extends URIS2> {
  _F: F
  set: <L, A>(a: Kind2<F, L, A>, ord: Ord<A>) => Kind2<F, Array<L>, Set<A>>
}

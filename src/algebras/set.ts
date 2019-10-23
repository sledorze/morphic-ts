import { Ord } from 'fp-ts/lib/Ord'
import { Kind, URIS, Kind2, URIS2 } from '../HKT'
import { M } from '../core'

export interface ModelAlgebraSet {
  set: <L, A>(a: M<L, A>, ord: Ord<A>) => M<Array<L>, Set<A>>
}

export interface ModelAlgebraSet1<F extends URIS> {
  set: <A>(a: Kind<F, A>, ord: Ord<A>) => Kind<F, Set<A>>
}

export interface ModelAlgebraSet2<F extends URIS2> {
  set: <L, A>(a: Kind2<F, L, A>, ord: Ord<A>) => Kind2<F, Array<L>, Set<A>>
}

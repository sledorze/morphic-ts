import { Ord } from 'fp-ts/lib/Ord'
import { Kind, URIS, Kind2, URIS2, HKT2 } from '../HKT'

export interface ModelAlgebraSet<F> {
  set: <L, A>(a: HKT2<F, L, A>, ord: Ord<A>) => HKT2<F, Array<L>, Set<A>>
}

export interface ModelAlgebraSet1<F extends URIS> {
  set: <A>(a: Kind<F, A>, ord: Ord<A>) => Kind<F, Set<A>>
}

export interface ModelAlgebraSet2<F extends URIS2> {
  set: <L, A>(a: Kind2<F, L, A>, ord: Ord<A>) => Kind2<F, Array<L>, Set<A>>
}

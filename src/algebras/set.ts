import { Ord } from 'fp-ts/lib/Ord'
import { Kind, URIS, Kind2, URIS2, HKT2 } from '../HKT'

export const URI = 'Set'
export type URI = typeof URI

declare module './hkt' {
  interface Algebra<F> {
    Set: ModelAlgebraSet<F>
  }
  interface Algebra1<F extends URIS> {
    Set: ModelAlgebraSet1<F>
  }
  interface Algebra2<F extends URIS2> {
    Set: ModelAlgebraSet2<F>
  }
}

export interface ModelAlgebraSet<F> {
  set: <L, A>(a: HKT2<F, L, A>, ord: Ord<A>) => HKT2<F, Array<L>, Set<A>>
}

export interface ModelAlgebraSet1<F extends URIS> {
  set: <A>(a: Kind<F, A>, ord: Ord<A>) => Kind<F, Set<A>>
}

export interface ModelAlgebraSet2<F extends URIS2> {
  set: <L, A>(a: Kind2<F, L, A>, ord: Ord<A>) => Kind2<F, Array<L>, Set<A>>
}

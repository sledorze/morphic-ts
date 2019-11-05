import { Kind, URIS, Kind2, URIS2, HKT2 } from '../HKT'

export interface ModelAlgebraStrMap<F> {
  strMap: <L, A>(codomain: HKT2<F, L, A>) => HKT2<F, Array<[string, L]>, Record<string, A>>
}

export interface ModelAlgebraStrMap1<F extends URIS> {
  strMap: <A>(codomain: Kind<F, A>) => Kind<F, Record<string, A>>
}

export interface ModelAlgebraStrMap2<F extends URIS2> {
  strMap: <L, A>(codomain: Kind2<F, L, A>) => Kind2<F, Record<string, L>, Record<string, A>>
}

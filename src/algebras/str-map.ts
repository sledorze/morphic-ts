import { Kind, URIS, Kind2, URIS2 } from '../HKT'
import { M } from '../core'

export interface ModelAlgebraStrMap {
  strMap: <L, A>(codomain: M<L, A>) => M<Array<[string, L]>, Record<string, A>>
}

export interface ModelAlgebraStrMap1<F extends URIS> {
  strMap: <A>(codomain: Kind<F, A>) => Kind<F, Record<string, A>>
}

export interface ModelAlgebraStrMap2<F extends URIS2> {
  strMap: <L, A>(codomain: Kind2<F, L, A>) => Kind2<F, Record<string, L>, Record<string, A>>
}

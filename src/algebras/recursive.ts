import { URIS, Kind, URIS2, Kind2 } from '../HKT'
import { M } from '../core'

export interface ModelAlgebraRecursive {
  recursive: <L, A>(a: () => M<L, A>) => M<L, A>
}

export interface ModelAlgebraRecursive1<F extends URIS> {
  recursive: <A>(a: () => Kind<F, A>) => Kind<F, A>
}

export interface ModelAlgebraRecursive2<F extends URIS2> {
  recursive: <L, A>(a: () => Kind2<F, L, A>) => Kind2<F, L, A>
}

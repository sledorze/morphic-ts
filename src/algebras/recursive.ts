import { URIS, Kind, URIS2, Kind2, HKT2 } from '../HKT'

export interface ModelAlgebraRecursive<F> {
  recursive: <L, A>(a: () => HKT2<F, L, A>) => HKT2<F, L, A>
}

export interface ModelAlgebraRecursive1<F extends URIS> {
  recursive: <A>(a: () => Kind<F, A>) => Kind<F, A>
}

export interface ModelAlgebraRecursive2<F extends URIS2> {
  recursive: <L, A>(a: () => Kind2<F, L, A>) => Kind2<F, L, A>
}

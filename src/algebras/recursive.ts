import { URIS, Kind, URIS2, Kind2, HKT2 } from '../HKT'

export const URI = 'Recursive'
export type URI = typeof URI

declare module './hkt' {
  interface Algebra<F> {
    Recursive: ModelAlgebraRecursive<F>
  }
  interface Algebra1<F extends URIS> {
    Recursive: ModelAlgebraRecursive1<F>
  }
  interface Algebra2<F extends URIS2> {
    Recursive: ModelAlgebraRecursive2<F>
  }
}

export interface ModelAlgebraRecursive<F> {
  recursive: <L, A>(a: (x: HKT2<F, L, A>) => HKT2<F, L, A>) => HKT2<F, L, A>
}

export interface ModelAlgebraRecursive1<F extends URIS> {
  recursive: <A>(a: (x: Kind<F, A>) => Kind<F, A>) => Kind<F, A>
}

export interface ModelAlgebraRecursive2<F extends URIS2> {
  recursive: <L, A>(a: (x: Kind2<F, L, A>) => Kind2<F, L, A>) => Kind2<F, L, A>
}

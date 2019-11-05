import { Kind, URIS, Kind2, URIS2, HKT2 } from '../HKT'

export const URI = 'StrMap'
export type URI = typeof URI

declare module './hkt' {
  interface Algebra<F> {
    StrMap: ModelAlgebraStrMap<F>
  }
  interface Algebra1<F extends URIS> {
    StrMap: ModelAlgebraStrMap1<F>
  }
  interface Algebra2<F extends URIS2> {
    StrMap: ModelAlgebraStrMap2<F>
  }
}

export interface ModelAlgebraStrMap<F> {
  strMap: <L, A>(codomain: HKT2<F, L, A>) => HKT2<F, Array<[string, L]>, Record<string, A>>
}

export interface ModelAlgebraStrMap1<F extends URIS> {
  strMap: <A>(codomain: Kind<F, A>) => Kind<F, Record<string, A>>
}

export interface ModelAlgebraStrMap2<F extends URIS2> {
  strMap: <L, A>(codomain: Kind2<F, L, A>) => Kind2<F, Record<string, L>, Record<string, A>>
}

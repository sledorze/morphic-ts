import { URIS, URIS2 } from '@sledorze/morphic-common/lib/HKT'

export interface Algebra<F> {
  _AF: F
}
export interface Algebra1<F extends URIS> {
  _AF: F
}
export interface Algebra2<F extends URIS2> {
  _AF: F
}
export type AlgebraURIS = keyof Algebra<never>

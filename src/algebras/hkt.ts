import { URIS, URIS2 } from '../HKT'

export interface Algebra<F> {}
export interface Algebra1<F extends URIS> {}
export interface Algebra2<F extends URIS2> {}
export type Algebra1URIS = keyof Algebra1<any>
export type Algebra2URIS = keyof Algebra2<any>
export type AlgebraURIS = Algebra1URIS | Algebra2URIS

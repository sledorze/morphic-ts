import { URIS, URIS2 } from '../HKT'

export interface Algebra<F> {}
export interface Algebra1<F extends URIS> {}
export interface Algebra2<F extends URIS2> {}
export type AlgebraURIS = keyof Algebra<never>

export interface InterpreterAlgebra<F> {}

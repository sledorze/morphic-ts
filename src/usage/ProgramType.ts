/**
 * A Program is expressed within an Algebra to materialize a Morph
 */
export interface ProgramType<E, A> {}
export declare type ProgramURI = keyof ProgramType<any, any>

export interface ProgramTypes {}

export interface ProgramAlgebra<F> {}
export interface ProgramAlgebraURI {}

/**
 * A Program is expressed within an Algebra to materialize a Morph
 */
export interface ProgramType<E, A> {
  _E: E
  _A: A
}
export declare type ProgramURI = Exclude<keyof ProgramType<any, any>, '_E' | '_A'>

export interface ProgramTypes {}

export interface ProgramAlgebra<F> {
  _F: F
}
export interface ProgramAlgebraURI {}

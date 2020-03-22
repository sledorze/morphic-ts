/**
 * A Program is expressed within an Algebra to materialize a Morph
 */
/**
 *  @since 0.0.1
 */
export interface ProgramType<E, A> {
  _E: E
  _A: A
}
/**
 *  @since 0.0.1
 */
export declare type ProgramURI = Exclude<keyof ProgramType<any, any>, '_E' | '_A'>

/**
 *  @since 0.0.1
 */
export interface ProgramAlgebra<F> {
  _F: F
}
/**
 *  @since 0.0.1
 */
export interface ProgramAlgebraURI {}

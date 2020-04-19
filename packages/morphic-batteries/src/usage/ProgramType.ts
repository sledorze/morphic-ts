/**
 * A Program is expressed within an Algebra to materialize a Morph
 */

import { AnyConfigEnv } from './summoner'

/**
 *  @since 0.0.1
 */
export interface ProgramType<R extends AnyConfigEnv, E, A> {
  (_R: R): void
  _E: E
  _A: A
}
/**
 *  @since 0.0.1
 */
export declare type ProgramURI = Exclude<keyof ProgramType<any, any, any>, '_E' | '_A' | '_R'>

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

import type { SelectKeyOfMatchingValues } from './utils'

/**
 *  @since 0.0.1
 */
export interface InterpreterResult<E, A> extends Record<keyof InterpreterResult<any, any>, { build: (x: A) => A }> {}
/**
 *  @since 0.0.1
 */
export type InterpreterURI = keyof InterpreterResult<any, any>

/**
 *  @since 0.0.1
 */
export type SelectInterpURIs<E, A, ShapeConstraint> = SelectKeyOfMatchingValues<
  InterpreterResult<E, A>,
  ShapeConstraint
>

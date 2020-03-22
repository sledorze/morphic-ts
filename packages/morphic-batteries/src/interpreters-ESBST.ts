import { Eq } from 'fp-ts/lib/Eq'
import { Show } from 'fp-ts/lib/Show'
import { Type } from 'io-ts'

/**
 *  @since 0.0.1
 */
export const ESBSTInterpreterURI = 'ESBSTInterpreterURI' as const
/**
 *  @since 0.0.1
 */
export type ESBSTInterpreterURI = typeof ESBSTInterpreterURI

interface ESBSTInterpreter<E, A> {
  build: (a: A) => A
  eq: Eq<A>
  show: Show<A>
  strictType: Type<A, E, unknown>
  type: Type<A, E, unknown>
}

declare module './usage/InterpreterResult' {
  interface InterpreterResult<E, A> {
    [ESBSTInterpreterURI]: ESBSTInterpreter<E, A>
  }
}

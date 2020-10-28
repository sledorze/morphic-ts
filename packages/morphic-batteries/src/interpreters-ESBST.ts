import type { Eq } from 'fp-ts/Eq'
import type { Show } from 'fp-ts/Show'
import type { Type } from 'io-ts'
import type { Create } from '@morphic-ts/io-ts-interpreters/lib/create'

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
  create: Create<A>
}

declare module '@morphic-ts/summoners/lib/InterpreterResult' {
  interface InterpreterResult<E, A> {
    [ESBSTInterpreterURI]: ESBSTInterpreter<E, A>
  }
}

import type { Eq } from 'fp-ts/Eq'
import type { Show } from 'fp-ts/Show'
import type { Arbitrary } from 'fast-check'
import type { Type } from 'io-ts'
import type { Create } from '@morphic-ts/io-ts-interpreters/lib/create'

/**
 *  @since 0.0.1
 */
export const ESBASTInterpreterURI = 'ESBASTInterpreterURI' as const
/**
 *  @since 0.0.1
 */
export type ESBASTInterpreterURI = typeof ESBASTInterpreterURI

interface ESBASTInterpreter<E, A> {
  build: (a: A) => A
  eq: Eq<A>
  show: Show<A>
  arb: Arbitrary<A>
  strictType: Type<A, E, unknown>
  type: Type<A, E, unknown>
  create: Create<A>
}

declare module '@morphic-ts/summoners/lib/InterpreterResult' {
  interface InterpreterResult<E, A> {
    [ESBASTInterpreterURI]: ESBASTInterpreter<E, A>
  }
}

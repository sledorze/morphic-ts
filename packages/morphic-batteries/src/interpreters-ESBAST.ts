import { Eq } from 'fp-ts/lib/Eq'
import { Show } from 'fp-ts/lib/Show'
import { Arbitrary } from 'fast-check/*'
import { Type } from 'io-ts'
import { Create } from './create'

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

declare module './usage/InterpreterResult' {
  interface InterpreterResult<E, A> {
    [ESBASTInterpreterURI]: ESBASTInterpreter<E, A>
  }
}

import { FastCheckType, FastCheckURI } from '../hkt'
import { ModelAlgebraTerm1 } from '@morphic-ts/model-algebras/lib/term'
import { Arbitrary } from 'fast-check'

declare module '@morphic-ts/model-algebras/lib/term' {
  /**
   *  @since 0.0.1
   */
  interface TermConstructor<A, E> {
    [FastCheckURI]: Arbitrary<A>
  }
}

/**
 *  @since 0.0.1
 */
export const fastCheckTermInterpreter: ModelAlgebraTerm1<FastCheckURI> = {
  _F: FastCheckURI,
  term: () => ({ [FastCheckURI]: a }) => new FastCheckType(a)
}

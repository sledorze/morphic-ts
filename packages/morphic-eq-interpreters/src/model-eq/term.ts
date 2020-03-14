import { EqURI, EqType } from '../hkt'
import { ModelAlgebraTerm1 } from '@morphic-ts/model-algebras/lib/term'
import { Eq } from 'fp-ts/lib/Eq'

declare module '@morphic-ts/model-algebras/lib/term' {
  /**
   *  @since 0.0.1
   */
  interface TermConstructor<A, E> {
    [EqURI]: Eq<A>
  }
}

/**
 *  @since 0.0.1
 */
export const eqTermInterpreter: ModelAlgebraTerm1<EqURI> = {
  _F: EqURI,
  term: () => ({ [EqURI]: a }) => new EqType(a)
}

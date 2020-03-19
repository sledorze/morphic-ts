import { OrdURI, OrdType } from '../hkt'
import { ModelAlgebraTerm1 } from '@morphic-ts/model-algebras/lib/term'
import { Ord } from 'fp-ts/lib/Ord'

declare module '@morphic-ts/model-algebras/lib/term' {
  /**
   *  @since 0.0.1
   */
  interface TermConstructor<A, E> {
    [OrdURI]: Ord<A>
  }
}

/**
 *  @since 0.0.1
 */
export const ordTermInterpreter: ModelAlgebraTerm1<OrdURI> = {
  _F: OrdURI,
  term: (_, { [OrdURI]: a }) => new OrdType(a)
}

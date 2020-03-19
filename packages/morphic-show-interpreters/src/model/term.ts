import { ShowURI, ShowType } from '../hkt'
import { ModelAlgebraTerm1 } from '@morphic-ts/model-algebras/lib/term'
import { Show } from 'fp-ts/lib/Show'

declare module '@morphic-ts/model-algebras/lib/term' {
  /**
   *  @since 0.0.1
   */
  interface TermConstructor<A, E> {
    [ShowURI]: Show<A>
  }
}

/**
 *  @since 0.0.1
 */
export const showTermInterpreter: ModelAlgebraTerm1<ShowURI> = {
  _F: ShowURI,
  term: (name, { [ShowURI]: a }) => new ShowType({ show: x => `<${name}>(${a.show(x as any)})` })
}

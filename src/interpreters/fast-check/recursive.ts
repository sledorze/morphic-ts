import { FastCheckType, URI } from '.'
import { ModelAlgebraRecursive1 } from '../../algebras/recursive'
import * as fc from 'fast-check'

export const fastCheckRecursiveInterpreter: ModelAlgebraRecursive1<URI> = {
  recursive: <A>(a: () => FastCheckType<A>) => {
    let cache: null | fc.Arbitrary<A> = null
    return new FastCheckType(
      fc.constant(null).chain(_ => {
        if (cache === null) {
          cache = a().arb
        }
        return cache
      })
    )
  }
}

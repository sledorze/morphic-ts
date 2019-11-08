import * as fc from 'fast-check'
import { FastCheckType, URI } from '.'
import { fromArray } from 'fp-ts/lib/Set'
import { ModelAlgebraSet1 } from '../../algebras/set'

export const fastCheckSetInterpreter: ModelAlgebraSet1<URI> = {
  set: (a, ord) => new FastCheckType(() => fc.set(a.arb()).map(fromArray(ord)))
}

import * as fc from 'fast-check'
import { FastCheckType, URI } from '.'
import { fromArray } from 'fp-ts/lib/Set'
import { ModelAlgebraCollection1 } from '../../algebras/collections'
import { array, record, semigroup } from 'fp-ts'

const strmapFromArray = <A>() => record.fromFoldable(semigroup.getFirstSemigroup<A>(), array.array)
export const fastCheckCollectionInterpreter: ModelAlgebraCollection1<URI> = {
  set: (a, ord) => new FastCheckType(fc.set(a.arb).map(fromArray(ord))),
  strMap: codomain => new FastCheckType(fc.array(fc.tuple(fc.string(), codomain.arb)).map(strmapFromArray()))
}

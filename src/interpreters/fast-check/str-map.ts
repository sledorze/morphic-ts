import * as fc from 'fast-check'
import { FastCheckType, FastCheckURI } from '.'
import { ModelAlgebraStrMap1 } from '../../algebras/str-map'
import { array, record, semigroup } from 'fp-ts'

const strmapFromArray = <A>() => record.fromFoldable(semigroup.getFirstSemigroup<A>(), array.array)
export const fastCheckStrMapInterpreter: ModelAlgebraStrMap1<FastCheckURI> = {
  strMap: codomain => new FastCheckType(fc.array(fc.tuple(fc.string(), codomain.arb)).map(strmapFromArray()))
}

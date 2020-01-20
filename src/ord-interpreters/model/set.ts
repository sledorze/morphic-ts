import { array } from 'fp-ts'
import { ord } from 'fp-ts/lib/Ord'
import { ModelAlgebraSet1 } from '../../model-algebras/set'
import { OrdType, OrdURI } from '..'
import { toArray } from 'fp-ts/lib/Set'

export const ordSetInterpreter: ModelAlgebraSet1<OrdURI> = {
  set: (a, ordA) => new OrdType(ord.contramap(array.getOrd(a.ord), toArray(ordA)))
}

import { array } from 'fp-ts'
import { ord } from 'fp-ts/lib/Ord'
import { ModelAlgebraSet1 } from '../../algebras/set'
import { OrdType, URI } from '.'
import { toArray } from 'fp-ts/lib/Set'

export const ordSetInterpreter: ModelAlgebraSet1<URI> = {
  set: (a, ordA) => new OrdType(ord.contramap(array.getOrd(a.ord), toArray(ordA)))
}

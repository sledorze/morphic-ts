import { FastCheckType, FastCheckURI } from '..'
import { ModelAlgebraUnions1 } from '@sledorze/morphic-model-algebras/lib/unions'
import { oneof } from 'fast-check'

export const fastCheckUnionInterpreter: ModelAlgebraUnions1<FastCheckURI> = {
  _F: FastCheckURI,
  union: <A>(items: FastCheckType<A>[]) => new FastCheckType(oneof(...items.map(v => v.arb)))
}

import { FastCheckType, FastCheckURI } from '..'
import { ModelAlgebraUnions1 } from '../../model-algebras/unions'
import { oneof } from 'fast-check'

export const fastCheckUnionInterpreter: ModelAlgebraUnions1<FastCheckURI> = {
  union: <A>(items: FastCheckType<A>[]) => new FastCheckType(oneof(...items.map(v => v.arb)))
}

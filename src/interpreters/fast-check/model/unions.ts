import * as fc from 'fast-check'
import { FastCheckType, FastCheckURI } from '..'
import { ModelAlgebraUnions1 } from '../../../model-algebras/unions'

export const fastCheckUnionInterpreter: ModelAlgebraUnions1<FastCheckURI> = {
  union: <A>(items: FastCheckType<A>[]) => new FastCheckType(fc.oneof(...items.map(v => v.arb)))
}

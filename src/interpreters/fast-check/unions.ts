import * as fc from 'fast-check'
import { FastCheckType, URI } from '.'
import { ModelAlgebraUnions1 } from '../../algebras/unions'

export const fastCheckUnionInterpreter: ModelAlgebraUnions1<URI> = {
  union: <A>(items: FastCheckType<A>[]) => new FastCheckType(() => fc.oneof(...items.map(v => v.arb())))
}

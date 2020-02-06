import { FastCheckType, FastCheckURI } from '..'
import { ModelAlgebraUnions1 } from 'morphic-model-algebras/lib/unions'
import { oneof } from 'fast-check'

/**
 *  @since 0.0.1
 */
export const fastCheckUnionInterpreter: ModelAlgebraUnions1<FastCheckURI> = {
  _F: FastCheckURI,
  union: <A>(items: FastCheckType<A>[]) => new FastCheckType(oneof(...items.map(v => v.arb)))
}

import * as fc from 'fast-check'
import { FastCheckType, URI } from '.'
import { ModelAlgebraTaggedUnions1 } from '../../algebras/tagged-unions'
import { collect, memo } from '../../utils'

/**
 * Beware: randomly generated recursive structure with high branching may not end early enough
 */
export const fastCheckTaggedUnionInterpreter: ModelAlgebraTaggedUnions1<URI> = {
  taggedUnion: (_tag, dic) => new FastCheckType(memo(() => fc.oneof(...collect(dic, (_, { arb }) => arb()))))
}

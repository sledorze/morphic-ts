import * as fc from 'fast-check'
import { FastCheckType, FastCheckURI } from '..'
import { ModelAlgebraTaggedUnions1 } from '../../model-algebras/tagged-unions'
import { collect } from '../../common/utils'

/**
 * Beware: randomly generated recursive structure with high branching may not end early enough
 */
export const fastCheckTaggedUnionInterpreter: ModelAlgebraTaggedUnions1<FastCheckURI> = {
  taggedUnion: (_tag, dic) => new FastCheckType(fc.oneof(...collect(dic, (_, { arb }) => arb)))
}

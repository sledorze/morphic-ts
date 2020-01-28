import { FastCheckType, FastCheckURI } from '..'
import { ModelAlgebraTaggedUnions1 } from '../../model-algebras/tagged-unions'
import { collect } from '../../common/utils'
import { oneof } from 'fast-check'

/**
 * Beware: randomly generated recursive structure with high branching may not end early enough
 */
export const fastCheckTaggedUnionInterpreter: ModelAlgebraTaggedUnions1<FastCheckURI> = {
  taggedUnion: (_tag, dic) => new FastCheckType(oneof(...collect(dic, (_, { arb }) => arb)))
}

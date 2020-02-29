import { FastCheckType, FastCheckURI } from '../hkt'
import { ModelAlgebraTaggedUnions1 } from '@morphic-ts/model-algebras/lib/tagged-unions'
import { collect } from '@morphic-ts/common/lib/utils'
import { oneof } from 'fast-check'

/**
 * Beware: randomly generated recursive structure with high branching may not end early enough
 */
/**
 *  @since 0.0.1
 */
export const fastCheckTaggedUnionInterpreter: ModelAlgebraTaggedUnions1<FastCheckURI> = {
  _F: FastCheckURI,
  taggedUnion: (_tag, dic) => new FastCheckType(oneof(...collect(dic, (_, { arb }) => arb)))
}

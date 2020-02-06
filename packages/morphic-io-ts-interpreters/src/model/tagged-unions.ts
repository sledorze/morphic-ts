import * as t from 'io-ts'
import { IOTSType, IoTsURI } from '..'
import { ModelAlgebraTaggedUnions2 } from 'morphic-model-algebras/lib/tagged-unions'
import { collect } from 'morphic-common/lib/utils'

/**
 *  @since 0.0.1
 */
export const ioTsTaggedUnionInterpreter: ModelAlgebraTaggedUnions2<IoTsURI> = {
  _F: IoTsURI,
  taggedUnion: (_tag, dic, name) => new IOTSType(t.union(collect(dic, (_, { type }) => type) as any, name))
}

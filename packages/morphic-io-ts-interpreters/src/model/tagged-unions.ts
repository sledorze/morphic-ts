import * as t from 'io-ts'
import { IOTSType, IoTsURI } from '../hkt'
import { ModelAlgebraTaggedUnions2 } from '@morphic-ts/model-algebras/lib/tagged-unions'
import { collect } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const ioTsTaggedUnionInterpreter: ModelAlgebraTaggedUnions2<IoTsURI> = {
  _F: IoTsURI,
  taggedUnion: (_tag, dic, name) => env =>
    new IOTSType(t.union(collect(dic, (_, getType) => getType(env).type) as any, name))
}

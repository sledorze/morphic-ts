import * as t from 'io-ts'
import { IOTSType, IoTsURI } from '..'
import { ModelAlgebraTaggedUnions2 } from '@sledorze/morphic-model-algebras/lib/tagged-unions'
import { collect } from '@sledorze/morphic-common/lib/utils'

export const ioTsTaggedUnionInterpreter: ModelAlgebraTaggedUnions2<IoTsURI> = {
  _F: IoTsURI,
  taggedUnion: (_tag, dic, name) => new IOTSType(t.union(collect(dic, (_, { type }) => type) as any, name))
}

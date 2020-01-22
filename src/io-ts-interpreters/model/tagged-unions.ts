import * as t from 'io-ts'
import { IOTSType, IoTsURI } from '..'
import { ModelAlgebraTaggedUnions2 } from '../../model-algebras/tagged-unions'
import { collect } from '../../common/utils'

export const ioTsTaggedUnionInterpreter: ModelAlgebraTaggedUnions2<IoTsURI> = {
  taggedUnion: (_tag, dic, name) => new IOTSType(t.union(collect(dic, (_, { type }) => type) as any, name))
}

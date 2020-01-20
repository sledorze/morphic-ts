import * as t from 'io-ts'
import { IOTSStringType, IoTsStringURI } from '..'
import { ModelAlgebraTaggedUnions2 } from '../../model-algebras/tagged-unions'
import { collect } from '../../common/utils'

export const ioTsStringTaggedUnionInterpreter: ModelAlgebraTaggedUnions2<IoTsStringURI> = {
  taggedUnion: (_tag, dic, name) => new IOTSStringType(t.union(collect(dic, (_, { type }) => type) as any, name))
}

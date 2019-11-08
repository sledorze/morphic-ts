import * as t from 'io-ts'
import { IOTSStringType, URI } from '.'
import { ModelAlgebraTaggedUnions2 } from '../../algebras/tagged-unions'
import { collect } from '../../utils'

export const ioTsStringTaggedUnionInterpreter: ModelAlgebraTaggedUnions2<URI> = {
  taggedUnion: (_tag, dic) => new IOTSStringType(() => t.union(collect(dic, (_, { type }) => type()) as any))
}

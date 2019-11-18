import * as t from 'io-ts'
import { IOTSType, URI } from '.'
import { ModelAlgebraTaggedUnions1 } from '../../algebras/tagged-unions'
import { collect } from '../../utils'

declare module '../../algebras/hkt' {}
export const ioTsTaggedUnionInterpreter: ModelAlgebraTaggedUnions1<URI> = {
  taggedUnion: (_tag, dic, name) => new IOTSType(t.union(collect(dic, (_, { type }) => type) as any, name))
}

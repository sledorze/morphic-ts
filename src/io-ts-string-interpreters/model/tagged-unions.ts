import * as t from 'io-ts'
import { IOTS2Type, IoTs2URI } from '..'
import { ModelAlgebraTaggedUnions2 } from '../../model-algebras/tagged-unions'
import { collect } from '../../common/utils'

export const ioTs2TaggedUnionInterpreter: ModelAlgebraTaggedUnions2<IoTs2URI> = {
  taggedUnion: (_tag, dic, name) => new IOTS2Type(t.union(collect(dic, (_, { type }) => type) as any, name))
}

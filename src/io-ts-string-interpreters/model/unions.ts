import * as t from 'io-ts'
import { IOTS2Type, IoTs2URI } from '..'
import { ModelAlgebraUnions2 } from '../../model-algebras/unions'

export const ioTs2UnionInterpreter: ModelAlgebraUnions2<IoTs2URI> = {
  union: <L, A>(items: Array<IOTS2Type<L, A>>, name: string) =>
    new IOTS2Type(t.union(items.map(x => x.type) as any, name)) // TODO: fix (follow up: https://github.com/gcanti/io-ts/issues/312)
}

import * as t from 'io-ts'
import { IOTS2Type, IoTs2URI } from '../index'
import { ModelAlgebraIntersection2 } from '../../model-algebras/intersections'

export const ioTs2IntersectionInterpreter: ModelAlgebraIntersection2<IoTs2URI> = {
  intersection: <L, A>(items: Array<IOTS2Type<L, A>>, name: string) =>
    new IOTS2Type(t.intersection(items.map(x => x.type) as any, name)) // TODO: fix (follow up: https://github.com/gcanti/io-ts/issues/312)
}

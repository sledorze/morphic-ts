import * as t from 'io-ts'
import { IOTSType, IoTsURI } from '..'
import { ModelAlgebraIntersection1 } from '../../model-algebras/intersections'

export const ioTsIntersectionInterpreter: ModelAlgebraIntersection1<IoTsURI> = {
  intersection: <A>(items: IOTSType<A>[], name: string) =>
    new IOTSType(t.intersection(items.map(x => x.type) as any, name)) // TODO: fix (follow up: https://github.com/gcanti/io-ts/issues/312)
}

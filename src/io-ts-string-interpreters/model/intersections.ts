import * as t from 'io-ts'
import { IOTSStringType, IoTsStringURI } from '../index'
import { ModelAlgebraIntersection2 } from '../../model-algebras/intersections'

export const ioTsStringIntersectionInterpreter: ModelAlgebraIntersection2<IoTsStringURI> = {
  intersection: <L, A>(items: Array<IOTSStringType<L, A>>, name: string) =>
    new IOTSStringType(t.intersection(items.map(x => x.type) as any, name)) // TODO: fix (follow up: https://github.com/gcanti/io-ts/issues/312)
}

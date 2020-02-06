import * as t from 'io-ts'
import { IOTSType, IoTsURI } from '../index'
import { ModelAlgebraIntersection2 } from '@morphic/model-algebras/lib/intersections'

/**
 *  @since 0.0.1
 */
export const ioTsIntersectionInterpreter: ModelAlgebraIntersection2<IoTsURI> = {
  _F: IoTsURI,
  intersection: <L, A>(items: Array<IOTSType<L, A>>, name: string) =>
    new IOTSType(t.intersection(items.map(x => x.type) as any, name)) // TODO: fix (follow up: https://github.com/gcanti/io-ts/issues/312)
}

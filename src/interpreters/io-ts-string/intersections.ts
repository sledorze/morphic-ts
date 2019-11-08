import * as t from 'io-ts'
import { IOTSStringType, URI } from '.'
import { ModelAlgebraIntersection2 } from '../../algebras/intersections'

export const ioTsStringIntersectionInterpreter: ModelAlgebraIntersection2<URI> = {
  intersection: <L, A>(items: Array<IOTSStringType<L, A>>) =>
    new IOTSStringType(() => t.intersection(items.map(x => x.type()) as any)) // TODO: fix (follow up: https://github.com/gcanti/io-ts/issues/312)
}

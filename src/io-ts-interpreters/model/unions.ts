import * as t from 'io-ts'
import { IOTSType, IoTsURI } from '..'
import { ModelAlgebraUnions2 } from '../../model-algebras/unions'

export const ioTsUnionInterpreter: ModelAlgebraUnions2<IoTsURI> = {
  union: <L, A>(items: Array<IOTSType<L, A>>, name: string) =>
    new IOTSType(t.union(items.map(x => x.type) as any, name)) // TODO: fix (follow up: https://github.com/gcanti/io-ts/issues/312)
}

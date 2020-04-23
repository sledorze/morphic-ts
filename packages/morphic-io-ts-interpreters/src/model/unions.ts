import * as t from 'io-ts'
import { IOTSType, IoTsURI } from '../hkt'
import { ModelAlgebraUnions2 } from '@morphic-ts/model-algebras/lib/unions'
import { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const ioTsUnionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraUnions2<IoTsURI, Env> => ({
    _F: IoTsURI,
    union: <R, L, A>(items: Array<(_: R) => IOTSType<L, A>>, name: string) => (env: R) =>
      new IOTSType(t.union(items.map(x => x(env).type) as any, name)) // TODO: fix (follow up: https://github.com/gcanti/io-ts/issues/312)
  })
)

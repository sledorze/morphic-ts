import * as t from 'io-ts'
import { IOTSType, IoTsURI } from '../hkt'
import { ModelAlgebraIntersection2 } from '@morphic-ts/model-algebras/lib/intersections'
import { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const ioTsIntersectionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraIntersection2<IoTsURI, Env> => ({
    _F: IoTsURI,
    intersection: <L, A>(items: Array<(_: Env) => IOTSType<L, A>>, name: string) => (env: Env) =>
      new IOTSType(t.intersection(items.map(x => x(env).type) as any, name)) // TODO: fix (follow up: https://github.com/gcanti/io-ts/issues/312)
  })
)

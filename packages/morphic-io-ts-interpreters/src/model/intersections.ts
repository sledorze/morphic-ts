import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraIntersection } from '@morphic-ts/model-algebras/lib/intersections'
import type { Array } from '@morphic-ts/model-algebras/lib/types'
import * as t from 'io-ts'

import { IOTSType, IoTsURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const ioTsIntersectionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraIntersection<IoTsURI, Env> => ({
    _F: IoTsURI,
    intersection: <L, A>(items: Array<(_: Env) => IOTSType<L, A>>, name: string) => (env: Env) =>
      new IOTSType(t.intersection(items.map(x => x(env).type) as any, name)) // TODO: fix (follow up: https://github.com/gcanti/io-ts/issues/312)
  })
)

import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { Array } from '@morphic-ts/model-algebras/lib/types'
import type { ModelAlgebraUnions } from '@morphic-ts/model-algebras/lib/unions'
import * as t from 'io-ts'

import { IOTSType, IoTsURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const ioTsUnionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraUnions<IoTsURI, Env> => ({
    _F: IoTsURI,
    union: <R, L, A>(items: Array<(_: R) => IOTSType<L, A>>, name: string) => (env: R) =>
      new IOTSType(t.union(items.map(x => x(env).type) as any, name)) // TODO: fix (follow up: https://github.com/gcanti/io-ts/issues/312)
  })
)

import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { collect, memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraTaggedUnions2 } from '@morphic-ts/model-algebras/lib/tagged-unions'
import * as t from 'io-ts'

import { iotsApplyConfig } from '../config'
import { IOTSType, IoTsURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const ioTsTaggedUnionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraTaggedUnions2<IoTsURI, Env> => ({
    _F: IoTsURI,
    taggedUnion: (_tag, dic, name, config) => env =>
      new IOTSType(iotsApplyConfig(config)(t.union(collect(dic, (_, getType) => getType(env).type) as any, name), env))
  })
)

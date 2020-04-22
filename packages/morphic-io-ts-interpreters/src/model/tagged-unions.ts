import * as t from 'io-ts'
import { IOTSType, IoTsURI } from '../hkt'
import { ModelAlgebraTaggedUnions2 } from '@morphic-ts/model-algebras/lib/tagged-unions'
import { collect } from '@morphic-ts/common/lib/utils'
import { iotsApplyConfig } from '../config'
import { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const ioTsTaggedUnionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraTaggedUnions2<IoTsURI, Env> => ({
    _F: IoTsURI,
    taggedUnion: (_tag, dic, name) => env =>
      new IOTSType(t.union(collect(dic, (_, getType) => getType(env).type) as any, name)),
    taggedUnionCfg: (_tag, dic, name) => config => env =>
      new IOTSType(iotsApplyConfig(config)(t.union(collect(dic, (_, getType) => getType(env).type) as any, name), env))
  })
)

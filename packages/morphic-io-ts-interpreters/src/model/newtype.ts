import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { AnyNewtype, ModelAlgebraNewtype, NewtypeA } from '@morphic-ts/model-algebras/lib/newtype'
import type { Type } from 'io-ts'

import { iotsApplyConfig } from '../config'
import { IOTSType, IoTsURI } from '../hkt'

const coerce = <N extends AnyNewtype, O, I>(e: Type<NewtypeA<N>, O, I>): Type<N, O, I> => (e as any) as Type<N, O, I>

/**
 *  @since 0.0.1
 */
export const ioTsNewtypeInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraNewtype<IoTsURI, Env> => ({
    _F: IoTsURI,
    newtype: () => (a, config) => env => new IOTSType(iotsApplyConfig(config)(coerce(a(env).type), env, {}))
  })
)

import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraIntersection } from '@morphic-ts/model-algebras/lib/intersections'
import * as t from 'io-ts'

import { IOTSType, IoTsURI } from '../hkt'
import { iotsApplyConfig } from './../config'

declare module '@morphic-ts/model-algebras/lib/intersections' {
  export interface IntersectionConfig<L extends readonly unknown[], A extends readonly unknown[]> {
    [IoTsURI]: {
      codecs: IntersectionLA<L, A, IoTsURI>
    }
  }
}

/**
 *  @since 0.0.1
 */
export const ioTsIntersectionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraIntersection<IoTsURI, Env> => ({
    _F: IoTsURI,
    intersection: (...items) => config => env => {
      const codecs = items.map(x => x(env).type)
      return new IOTSType(
        iotsApplyConfig(config?.conf)(t.intersection(codecs as any, config?.name), env, { codecs } as any)
      )
    }
  })
)

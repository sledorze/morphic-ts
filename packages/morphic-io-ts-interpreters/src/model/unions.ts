import type { AnyEnv } from '@morphic-ts/common/lib/config'
import type { HKT } from '@morphic-ts/common/lib/HKT'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraUnions } from '@morphic-ts/model-algebras/lib/unions'
import { pipe } from 'fp-ts/lib/pipeable'
import * as t from 'io-ts'

import { iotsApplyConfig } from '../config'
import { IOTSType, IoTsURI } from '../hkt'

declare module '@morphic-ts/model-algebras/lib/unions' {
  /**
   * @since 0.0.1
   */

  interface UnionConfig<Types> {
    [IoTsURI]: {
      types: {
        [k in keyof Types]: Types[k] extends HKT<any, infer E, infer A> ? t.Type<A, E> : never
      }
    }
  }
}

/**
 *  @since 0.0.1
 */
export const ioTsUnionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraUnions<IoTsURI, Env> => ({
    _F: IoTsURI,
    union: (...items) => (_guards, config) => env =>
      new IOTSType(
        pipe(
          items.map(x => x(env).type),
          types => iotsApplyConfig(config?.conf)(t.union(types as any, config?.name), env, { types } as any)
        ) // TODO: fix (follow up: https://github.com/gcanti/io-ts/issues/312)
      )
  })
)

import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo, projectFieldWithEnv } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraObject } from '@morphic-ts/model-algebras/lib/object'
import { record } from 'fast-check'

import { fastCheckApplyConfig } from '../config'
import { FastCheckType, FastCheckURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const fastCheckObjectInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraObject<FastCheckURI, Env> => ({
    _F: FastCheckURI,
    partial: (props, _name, config) => env =>
      new FastCheckType(
        fastCheckApplyConfig(config)(
          record(projectFieldWithEnv(props as any, env)('arb'), {
            withDeletedKeys: true
          }) as any,
          env
        )
      ),
    interface: (props, _name, config) => env =>
      new FastCheckType(
        fastCheckApplyConfig(config)(record(projectFieldWithEnv(props as any, env)('arb')) as any, env)
      ),
    both: (props, partial, _name, config) => env => {
      const arbs = projectFieldWithEnv(props, env)('arb')
      const partialArbs = projectFieldWithEnv(partial, env)('arb')
      return new FastCheckType(
        fastCheckApplyConfig(config)(
          record(arbs as any).chain(p =>
            record(partialArbs as any, { withDeletedKeys: true }).map(pp => ({ ...p, ...pp }))
          ) as any,
          env
        )
      )
    }
  })
)

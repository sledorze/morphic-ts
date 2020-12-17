import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo, projectFieldWithEnv } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraObject1 } from '@morphic-ts/model-algebras/lib/object'
import { record } from 'fast-check'

import { fastCheckApplyConfig } from '../config'
import { FastCheckType, FastCheckURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const fastCheckObjectInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraObject1<FastCheckURI, Env> => ({
    _F: FastCheckURI,
    partial: (props, _name, config) => env =>
      new FastCheckType(
        fastCheckApplyConfig(config)(
          record(projectFieldWithEnv(props, env)('arb'), {
            withDeletedKeys: true
          }),
          env
        )
      ),
    interface: (props, _name, config) => env =>
      new FastCheckType(fastCheckApplyConfig(config)(record(projectFieldWithEnv(props, env)('arb')), env)),
    both: (props, partial, _name, config) => env => {
      const arbs = projectFieldWithEnv(props, env)('arb')
      const partialArbs = projectFieldWithEnv(partial, env)('arb')
      return new FastCheckType(
        fastCheckApplyConfig(config)(
          record(arbs).chain(p => record(partialArbs, { withDeletedKeys: true }).map(pp => ({ ...p, ...pp }))),
          env
        )
      )
    }
  })
)

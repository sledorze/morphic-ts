import { FastCheckType, FastCheckURI } from '../hkt'
import type { ModelAlgebraObject1 } from '@morphic-ts/model-algebras/lib/object'
import { projectFieldWithEnv } from '@morphic-ts/common/lib/utils'
import { record } from 'fast-check'
import { fastCheckApplyConfig } from '../config'
import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

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
          }) as any, // FIXME: not acceptable (explicit coerce at list)
          env
        )
      ),
    interface: (props, _name, config) => env =>
      new FastCheckType(fastCheckApplyConfig(config)(record(projectFieldWithEnv(props, env)('arb')), env))
  })
)

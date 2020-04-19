import { FastCheckType, FastCheckURI } from '../hkt'
import { ModelAlgebraObject1 } from '@morphic-ts/model-algebras/lib/object'
import { projectFieldWithEnv } from '@morphic-ts/common/lib/utils'
import { record } from 'fast-check'
import { fastCheckApplyConfig } from '../config'

/**
 *  @since 0.0.1
 */
export const fastCheckObjectInterpreter: ModelAlgebraObject1<FastCheckURI> = {
  _F: FastCheckURI,
  partial: props => env =>
    new FastCheckType(
      record(projectFieldWithEnv(props, env)('arb'), {
        withDeletedKeys: true
      })
    ),

  partialCfg: props => config => env =>
    new FastCheckType(
      fastCheckApplyConfig(config)(
        record(projectFieldWithEnv(props, env)('arb'), {
          withDeletedKeys: true
        }) as any, // FIXME: not acceptable (explicit coerce at list)
        env
      )
    ),
  interface: props => env => new FastCheckType(record(projectFieldWithEnv(props, env)('arb'))),
  interfaceCfg: props => config => env =>
    new FastCheckType(fastCheckApplyConfig(config)(record(projectFieldWithEnv(props, env)('arb')), env))
}

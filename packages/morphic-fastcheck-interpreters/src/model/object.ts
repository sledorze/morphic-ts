import { FastCheckType, FastCheckURI } from '../hkt'
import { ModelAlgebraObject1 } from '@morphic-ts/model-algebras/lib/object'
import { projectFieldWithEnv } from '@morphic-ts/common/lib/utils'
import { record } from 'fast-check'

/**
 *  @since 0.0.1
 */
export const fastCheckObjectInterpreter: ModelAlgebraObject1<FastCheckURI> = {
  _F: FastCheckURI,
  // TODO: add customize
  partial: props => _config => env =>
    new FastCheckType(
      record(projectFieldWithEnv(props, env)('arb'), {
        withDeletedKeys: true
      })
    ),
  // TODO: add customize
  interface: props => _config => env => new FastCheckType(record(projectFieldWithEnv(props, env)('arb')))
}

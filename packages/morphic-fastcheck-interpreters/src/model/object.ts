import { FastCheckType, FastCheckURI } from '../hkt'
import { ModelAlgebraObject1, PropsKind1 } from '@morphic-ts/model-algebras/lib/object'
import { projectFieldWithEnv } from '@morphic-ts/common/lib/utils'
import { RecordConstraints, record } from 'fast-check'

/**
 *  @since 0.0.1
 */
export const fastCheckObjectInterpreter: ModelAlgebraObject1<FastCheckURI> = {
  _F: FastCheckURI,
  partial: <Props, R, RC>(props: PropsKind1<FastCheckURI, Props, R>) => (env: R & RC) =>
    new FastCheckType(
      record<Props, RecordConstraints>(projectFieldWithEnv(props, env)('arb'), {
        withDeletedKeys: true
      })
    ),
  interface: <Props, R, RC>(props: PropsKind1<FastCheckURI, Props, R>) => (env: R & RC) =>
    new FastCheckType(record<Props>(projectFieldWithEnv(props, env)('arb')))
}

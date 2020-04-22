import { ModelAlgebraObject1 } from '@morphic-ts/model-algebras/lib/object'
import { EqType, EqURI } from '../hkt'
import { projectFieldWithEnv, memo } from '@morphic-ts/common/lib/utils'
import { getStructEq } from 'fp-ts/lib/Eq'
import { eqApplyConfig } from '../config'
import { AnyEnv } from '@morphic-ts/common/lib/config'

const asPartial = <T>(x: EqType<T>): EqType<Partial<T>> => x as any
/**
 *  @since 0.0.1
 */
export const eqObjectInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraObject1<EqURI, Env> => ({
    _F: EqURI,
    interface: props => env => new EqType(getStructEq(projectFieldWithEnv(props, env)('eq'))),
    interfaceCfg: props => config => env =>
      new EqType(eqApplyConfig(config)(getStructEq(projectFieldWithEnv(props, env)('eq')), env)),
    // relies on Eq<A> whereas we need Eq<Partial<A>> (but works - covered by tests)
    partial: props => env => asPartial(new EqType(getStructEq(projectFieldWithEnv(props, env)('eq')))),
    partialCfg: props => config => env =>
      asPartial(new EqType(eqApplyConfig(config)(getStructEq(projectFieldWithEnv(props, env)('eq')), env)))
  })
)

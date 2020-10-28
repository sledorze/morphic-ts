import type { ModelAlgebraObject1 } from '@morphic-ts/model-algebras/lib/object'
import { EqType, EqURI } from '../hkt'
import { projectFieldWithEnv, memo, mapRecord } from '@morphic-ts/common/lib/utils'
import { getStructEq } from 'fp-ts/Eq'
import type { Eq } from 'fp-ts/Eq'
import { eqApplyConfig } from '../config'
import type { AnyEnv } from '@morphic-ts/common/lib/config'

const asPartialEq = <T>(x: Eq<T>): Eq<Partial<T>> => x as any

/**
 *  @since 0.0.1
 */
export const eqOrUndefined = <A>(eq: Eq<A>): Eq<A | undefined> => ({
  equals: (x, y) => (x === undefined ? y === undefined : y !== undefined && eq.equals(x, y))
})
/**
 *  @since 0.0.1
 */
export const eqObjectInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraObject1<EqURI, Env> => ({
    _F: EqURI,
    interface: (props, _name, config) => env =>
      new EqType(eqApplyConfig(config)(getStructEq(projectFieldWithEnv(props, env)('eq')), env)),
    // relies on Eq<A> whereas we need Eq<Partial<A>> (but works - covered by tests)
    partial: (props, _name, config) => env =>
      new EqType(
        eqApplyConfig(config)(
          asPartialEq(getStructEq(mapRecord(projectFieldWithEnv(props, env)('eq'), eqOrUndefined))),
          env
        )
      ),
    both: (props, pprops, _name, config) => env =>
      new EqType(
        eqApplyConfig(config)(
          getStructEq({
            ...mapRecord(projectFieldWithEnv(pprops, env)('eq'), eqOrUndefined),
            ...projectFieldWithEnv(props, env)('eq')
          } as any),
          env
        )
      )
  })
)

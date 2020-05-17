import { ModelAlgebraObject1 } from '@morphic-ts/model-algebras/lib/object'
import { RecycleType, RecycleURI } from '../hkt'
import { projectFieldWithEnv, memo } from '@morphic-ts/common/lib/utils'
import { recycleApplyConfig } from '../config'
import { AnyEnv } from '@morphic-ts/common/lib/config'
import { getStruct } from '../recycle'

const asPartial = <T>(x: RecycleType<T>): RecycleType<Partial<T>> => x as any
/**
 *  @since 0.0.1
 */
export const recycleObjectInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraObject1<RecycleURI, Env> => ({
    _F: RecycleURI,
    interface: (props, _name, config) => env =>
      new RecycleType(recycleApplyConfig(config)(getStruct(projectFieldWithEnv(props, env)('recycle')), env)),
    // relies on Eq<A> whereas we need Eq<Partial<A>> (but works - covered by tests)
    partial: (props, _name, config) => env =>
      asPartial(new RecycleType(recycleApplyConfig(config)(getStruct(projectFieldWithEnv(props, env)('recycle')), env)))
  })
)

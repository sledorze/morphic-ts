import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { mapRecord, memo, projectFieldWithEnv } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraObject1 } from '@morphic-ts/model-algebras/lib/object'
import type { Show } from 'fp-ts/Show'
import { getStructShow } from 'fp-ts/Show'

import { showApplyConfig } from '../config'
import { ShowType, ShowURI } from '../hkt'

const asPartialShow = <T>(x: Show<T>): Show<Partial<T>> => x as any

const showOrUndefined = <A>(s: Show<A>): Show<A | undefined> => ({
  show: x => (x === undefined ? 'undefined' : s.show(x))
})
/**
 *  @since 0.0.1
 */
export const showObjectInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraObject1<ShowURI, Env> => ({
    _F: ShowURI,
    interface: (props, _name, config) => env =>
      new ShowType(showApplyConfig(config)(getStructShow(projectFieldWithEnv(props, env)('show')), env)),
    partial: (props, _name, config) => env =>
      new ShowType(
        showApplyConfig(config)(
          asPartialShow(getStructShow(mapRecord(projectFieldWithEnv(props, env)('show'), showOrUndefined))),
          env
        )
      ),
    both: (props, pprops, _name, config) => env =>
      new ShowType(
        showApplyConfig(config)(
          getStructShow({
            ...projectFieldWithEnv(props, env)('show'),
            ...mapRecord(projectFieldWithEnv(pprops, env)('show'), showOrUndefined)
          } as any),
          env
        )
      )
  })
)

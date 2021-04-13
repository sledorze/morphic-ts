import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { mapRecord, memo, projectFieldWithEnv } from '@morphic-ts/common/lib/utils'
import type { InterfaceLA } from '@morphic-ts/model-algebras/lib/intersections'
import type { ModelAlgebraObject } from '@morphic-ts/model-algebras/lib/object'
import type { Show } from 'fp-ts/Show'
import { getStructShow } from 'fp-ts/Show'

import { showApplyConfig } from '../config'
import { ShowType, ShowURI } from '../hkt'

declare module '@morphic-ts/model-algebras/lib/object' {
  /**
   *  @since 0.0.1
   */
  export interface InterfaceConfig<Props> {
    ShowURI: {
      shows: InterfaceLA<Props, ShowURI>
    }
  }

  /**
   *  @since 0.0.1
   */
  export interface PartialConfig<Props> {
    ShowURI: {
      shows: InterfaceLA<Props, ShowURI>
    }
  }

  /**
   *  @since 0.0.1
   */
  export interface BothConfig<Props, PropsPartial> {
    ShowURI: {
      shows: InterfaceLA<Props, ShowURI>
      showsPartial: InterfaceLA<PropsPartial, ShowURI>
    }
  }
}

const asPartialShow = <T>(x: Show<T>): Show<Partial<T>> => x as any

const showOrUndefined = <A>(s: Show<A>): Show<A | undefined> => ({
  show: x => (x === undefined ? 'undefined' : s.show(x))
})
/**
 *  @since 0.0.1
 */
export const showObjectInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraObject<ShowURI, Env> => ({
    _F: ShowURI,
    interface: (props, config) => env => {
      const shows = projectFieldWithEnv(props as any, env)('show')
      return new ShowType(showApplyConfig(config?.conf)(getStructShow(shows), env, { shows } as any))
    },
    partial: (props, config) => env => {
      const shows = mapRecord(projectFieldWithEnv(props as any, env)('show'), showOrUndefined)
      return new ShowType(showApplyConfig(config?.conf)(asPartialShow(getStructShow(shows)), env, { shows } as any))
    },
    both: (props, pprops, config) => env => {
      const shows = projectFieldWithEnv(props, env)('show')
      const showsPartial = mapRecord(projectFieldWithEnv(pprops, env)('show'), showOrUndefined)
      return new ShowType(
        showApplyConfig(config?.conf)(
          getStructShow({
            ...shows,
            ...showsPartial
          }),
          env,
          { shows, showsPartial } as any
        )
      )
    }
  })
)

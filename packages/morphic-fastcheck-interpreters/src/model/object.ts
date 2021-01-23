import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo, projectFieldWithEnv } from '@morphic-ts/common/lib/utils'
import type { InterfaceLA } from '@morphic-ts/model-algebras/lib/intersections'
import type { ModelAlgebraObject } from '@morphic-ts/model-algebras/lib/object'
import { record } from 'fast-check'

import { fastCheckApplyConfig } from '../config'
import { FastCheckType, FastCheckURI } from '../hkt'

declare module '@morphic-ts/model-algebras/lib/object' {
  /**
   *  @since 0.0.1
   */
  export interface InterfaceConfig<Props> {
    FastCheckURI: {
      arbs: InterfaceLA<Props, FastCheckURI>
    }
  }

  /**
   *  @since 0.0.1
   */
  export interface PartialConfig<Props> {
    FastCheckURI: {
      arbs: InterfaceLA<Props, FastCheckURI>
    }
  }

  /**
   *  @since 0.0.1
   */
  export interface BothConfig<Props, PropsPartial> {
    FastCheckURI: {
      arbs: InterfaceLA<Props, FastCheckURI>
      arbsPartial: InterfaceLA<PropsPartial, FastCheckURI>
    }
  }
}

/**
 *  @since 0.0.1
 */
export const fastCheckObjectInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraObject<FastCheckURI, Env> => ({
    _F: FastCheckURI,
    partial: (props, _name, config) => env => {
      const arbs = projectFieldWithEnv(props as any, env)('arb')
      return new FastCheckType(
        fastCheckApplyConfig(config)(
          record(arbs, {
            withDeletedKeys: true
          }) as any,
          env,
          { arbs } as any
        )
      )
    },
    interface: (props, _name, config) => env => {
      const arbs = projectFieldWithEnv(props as any, env)('arb')
      return new FastCheckType(fastCheckApplyConfig(config)(record(arbs) as any, env, { arbs } as any))
    },
    both: (props, partial, _name, config) => env => {
      const arbs = projectFieldWithEnv(props, env)('arb')
      const partialArbs = projectFieldWithEnv(partial, env)('arb')
      return new FastCheckType(
        fastCheckApplyConfig(config)(
          record(arbs as any).chain(p =>
            record(partialArbs as any, { withDeletedKeys: true }).map(pp => ({ ...p, ...pp }))
          ) as any,
          env,
          { arbs, partialArbs } as any
        )
      )
    }
  })
)

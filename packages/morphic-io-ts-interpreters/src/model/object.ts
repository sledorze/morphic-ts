import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo, projectFieldWithEnv } from '@morphic-ts/common/lib/utils'
import type { InterfaceLA } from '@morphic-ts/model-algebras/lib/intersections'
import type { ModelAlgebraObject } from '@morphic-ts/model-algebras/lib/object'
import * as t from 'io-ts'

import { iotsApplyConfig } from '../config'
import { IOTSType, IoTsURI } from '../hkt'

declare module '@morphic-ts/model-algebras/lib/object' {
  /**
   *  @since 0.0.1
   */
  export interface InterfaceConfig<Props> {
    IoTsURI: {
      types: InterfaceLA<Props, IoTsURI>
    }
  }

  /**
   *  @since 0.0.1
   */
  export interface PartialConfig<Props> {
    IoTsURI: {
      types: InterfaceLA<Props, IoTsURI>
    }
  }

  /**
   *  @since 0.0.1
   */
  export interface BothConfig<Props, PropsPartial> {
    IoTsURI: {
      types: InterfaceLA<Props, IoTsURI>
      typesPartial: InterfaceLA<PropsPartial, IoTsURI>
    }
  }
}

/**
 *  @since 0.0.1
 */
export const ioTsNonStrictObjectInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraObject<IoTsURI, Env> => ({
    _F: IoTsURI,
    interface: (props, config) => (env: Env) => {
      const types = projectFieldWithEnv(props as any, env)('type')
      return new IOTSType(iotsApplyConfig(config?.conf)(t.type(types, config?.name) as any, env, { types } as any))
    },
    partial: (props, config) => (env: Env) => {
      const types = projectFieldWithEnv(props as any, env)('type')
      return new IOTSType(iotsApplyConfig(config?.conf)(t.partial(types, config?.name) as any, env, { types } as any))
    },
    both: (props, partial, config) => (env: Env) => {
      const types = projectFieldWithEnv(props, env)('type')
      const partialTypes = projectFieldWithEnv(partial, env)('type')
      return new IOTSType(
        iotsApplyConfig(config?.conf)(
          t.intersection([t.interface(types), t.partial(partialTypes)], config?.name) as any,
          env,
          {
            types,
            partialTypes
          } as any
        )
      )
    }
  })
)

/**
 *  @since 0.0.1
 */
export const ioTsStrictObjectInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraObject<IoTsURI, Env> => ({
    _F: IoTsURI,
    interface: (props, config) => (env: Env) => {
      const types = projectFieldWithEnv(props as any, env)('type')
      return new IOTSType(iotsApplyConfig(config?.conf)(t.strict(types, config?.name) as any, env, { types } as any))
    },
    partial: (props, config) => (env: Env) => {
      const types = projectFieldWithEnv(props as any, env)('type')
      return new IOTSType(
        iotsApplyConfig(config?.conf)(t.exact(t.partial(types, config?.name)) as any, env, { types } as any)
      )
    },
    both: (props, partial, config?) => (env: Env) => {
      const types = projectFieldWithEnv(props, env)('type')
      const typesPartial = projectFieldWithEnv(partial, env)('type')
      return new IOTSType(
        iotsApplyConfig(config?.conf)(
          t.exact(t.intersection([t.interface(types), t.partial(typesPartial)], config?.name)) as any,
          env,
          { types, typesPartial } as any
        )
      )
    }
  })
)

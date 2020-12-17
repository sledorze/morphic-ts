import type { AnyEnv, ConfigsForType } from '@morphic-ts/common/lib/config'
import { memo, projectFieldWithEnv } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraObject2, PropsKind2 } from '@morphic-ts/model-algebras/lib/object'
import * as t from 'io-ts'

import { iotsApplyConfig } from '../config'
import { IOTSType, IoTsURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const ioTsNonStrictObjectInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraObject2<IoTsURI, Env> => ({
    _F: IoTsURI,
    interface: <PropsE, PropsA>(
      props: PropsKind2<IoTsURI, PropsE, PropsA, Env>,
      name: string,
      config?: ConfigsForType<Env, PropsE, PropsA>
    ) => (env: Env) =>
      new IOTSType<PropsE, PropsA>(
        iotsApplyConfig(config)(t.type(projectFieldWithEnv(props, env)('type'), name) as any, env)
      ),
    partial: <PropsE, PropsA>(
      props: PropsKind2<IoTsURI, PropsE, PropsA, Env>,
      name: string,
      config?: ConfigsForType<Env, Partial<PropsE>, Partial<PropsA>>
    ) => (env: Env) =>
      new IOTSType<Partial<PropsE>, Partial<PropsA>>(
        iotsApplyConfig(config)(t.partial(projectFieldWithEnv(props, env)('type'), name) as any, env) as any
      ),
    both: <PropsE, PPropsE, PropsA, PPropsA>(
      props: PropsKind2<IoTsURI, PropsE, PropsA, Env>,
      partial: PropsKind2<IoTsURI, PPropsE, PPropsA, Env>,
      name: string,
      config?: ConfigsForType<Env, PropsE & Partial<PPropsE>, PropsA & Partial<PPropsA>>
    ) => (env: Env) =>
      new IOTSType<PropsE & Partial<PPropsE>, PropsA & Partial<PPropsA>>(
        iotsApplyConfig(config)(
          t.intersection(
            [
              t.interface(projectFieldWithEnv(props, env)('type')),
              t.partial(projectFieldWithEnv(partial, env)('type'))
            ],
            name
          ) as any,
          env
        ) as any
      )
  })
)

/**
 *  @since 0.0.1
 */
export const ioTsStrictObjectInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraObject2<IoTsURI, Env> => ({
    _F: IoTsURI,
    interface: <PropsE, PropsA>(
      props: PropsKind2<IoTsURI, PropsE, PropsA, Env>,
      name: string,
      config?: ConfigsForType<Env, PropsE, PropsA>
    ) => (env: Env) =>
      new IOTSType<PropsE, PropsA>(
        iotsApplyConfig(config)(t.strict(projectFieldWithEnv(props, env)('type'), name) as any, env)
      ),
    partial: <PropsE, PropsA>(
      props: PropsKind2<IoTsURI, PropsE, PropsA, Env>,
      name: string,
      config?: ConfigsForType<Env, Partial<PropsE>, Partial<PropsA>>
    ) => (env: Env) =>
      new IOTSType<Partial<PropsE>, Partial<PropsA>>(
        iotsApplyConfig(config)(t.exact(t.partial(projectFieldWithEnv(props, env)('type'), name)) as any, env) as any
      ),
    both: <PropsE, PPropsE, PropsA, PPropsA>(
      props: PropsKind2<IoTsURI, PropsE, PropsA, Env>,
      partial: PropsKind2<IoTsURI, PPropsE, PPropsA, Env>,
      name: string,
      config?: ConfigsForType<Env, PropsE & Partial<PPropsE>, PropsA & Partial<PPropsA>>
    ) => (env: Env) =>
      new IOTSType<PropsE & Partial<PPropsE>, PropsA & Partial<PPropsA>>(
        iotsApplyConfig(config)(
          t.exact(
            t.intersection(
              [
                t.interface(projectFieldWithEnv(props, env)('type')),
                t.partial(projectFieldWithEnv(partial, env)('type'))
              ],
              name
            )
          ) as any,
          env
        ) as any
      )
  })
)

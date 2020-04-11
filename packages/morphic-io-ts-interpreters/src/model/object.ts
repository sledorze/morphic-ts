import * as t from 'io-ts'
import { IOTSType, IoTsURI } from '../hkt'
import { ModelAlgebraObject2, PropsKind2 } from '@morphic-ts/model-algebras/lib/object'
import { ByInterp } from '@morphic-ts/common/lib/config'
import { ObjectInterfaceConfig } from '@morphic-ts/algebras/lib/hkt'
import { Customize, applyCustomize } from './common'
import { projectFieldWithEnv } from '@morphic-ts/common/lib/utils'

declare module '@morphic-ts/algebras/lib/hkt' {
  /**
   *  @since 0.0.1
   */
  export interface ObjectInterfaceConfig<RC, E, A> {
    [IoTsURI]: Customize<RC, E, A> | undefined
  }
  /**
   *  @since 0.0.1
   */
  export interface ObjectPartialConfig<RC, E, A> {
    [IoTsURI]: Customize<RC, E, A> | undefined
  }
}

/**
 *  @since 0.0.1
 */
export const ioTsNonStrictObjectInterpreter: ModelAlgebraObject2<IoTsURI> = {
  _F: IoTsURI,
  interface: <PropsE, PropsA, R>(props: PropsKind2<IoTsURI, PropsE, PropsA, R>, name: string) => (env: R) =>
    new IOTSType<PropsE, PropsA>(t.type(projectFieldWithEnv(props, env)('type'), name) as any),
  interfaceCfg: <PropsE, PropsA, R>(props: PropsKind2<IoTsURI, PropsE, PropsA, R>, name: string) => <RC>(
    config: ByInterp<ObjectInterfaceConfig<RC, PropsE, PropsA>, IoTsURI>
  ) => (env: R & RC) =>
    new IOTSType<PropsE, PropsA>(
      applyCustomize(config)(t.type(projectFieldWithEnv(props, env)('type'), name) as any, env)
    ),
  partial: <PropsE, PropsA, R>(props: PropsKind2<IoTsURI, PropsE, PropsA, R>, name: string) => (env: R) =>
    new IOTSType<Partial<PropsE>, Partial<PropsA>>(t.partial(projectFieldWithEnv(props, env)('type'), name) as any),
  partialCfg: <PropsE, PropsA, R>(props: PropsKind2<IoTsURI, PropsE, PropsA, R>, name: string) => <RC>(
    config: ByInterp<ObjectInterfaceConfig<RC, PropsE, PropsA>, IoTsURI>
  ) => (env: R & RC) =>
    new IOTSType<Partial<PropsE>, Partial<PropsA>>(
      applyCustomize(config)(t.partial(projectFieldWithEnv(props, env)('type'), name) as any, env) as any
    )
}

/**
 *  @since 0.0.1
 */
export const ioTsStrictObjectInterpreter: ModelAlgebraObject2<IoTsURI> = {
  _F: IoTsURI,
  interface: <PropsE, PropsA, R>(props: PropsKind2<IoTsURI, PropsE, PropsA, R>, name: string) => (env: R) =>
    new IOTSType<PropsE, PropsA>(t.strict(projectFieldWithEnv(props, env)('type'), name) as any),
  interfaceCfg: <PropsE, PropsA, R>(props: PropsKind2<IoTsURI, PropsE, PropsA, R>, name: string) => <RC>(
    config: ByInterp<ObjectInterfaceConfig<RC, PropsE, PropsA>, IoTsURI>
  ) => (env: R & RC) =>
    new IOTSType<PropsE, PropsA>(
      applyCustomize(config)(t.strict(projectFieldWithEnv(props, env)('type'), name) as any, env)
    ),
  partial: <PropsE, PropsA, R>(props: PropsKind2<IoTsURI, PropsE, PropsA, R>, name: string) => (env: R) =>
    new IOTSType<Partial<PropsE>, Partial<PropsA>>(
      t.exact(t.partial(projectFieldWithEnv(props, env)('type'), name)) as any
    ),
  partialCfg: <PropsE, PropsA, R>(props: PropsKind2<IoTsURI, PropsE, PropsA, R>, name: string) => <RC>(
    config: ByInterp<ObjectInterfaceConfig<RC, PropsE, PropsA>, IoTsURI>
  ) => (env: R & RC) =>
    new IOTSType<Partial<PropsE>, Partial<PropsA>>(
      applyCustomize(config)(t.exact(t.partial(projectFieldWithEnv(props, env)('type'), name)) as any, env) as any
    )
}

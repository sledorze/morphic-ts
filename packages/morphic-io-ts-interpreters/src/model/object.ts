import * as t from 'io-ts'
import { IOTSType, IoTsURI } from '../hkt'
import { ModelAlgebraObject2, PropsKind2 } from '@morphic-ts/model-algebras/lib/object'
import { projectFieldWithEnv } from '@morphic-ts/common/lib/utils'
import { ConfigsForType, ConfigsEnvs } from '@morphic-ts/common/lib/config'
import { iotsApplyConfig } from '../config'

/**
 *  @since 0.0.1
 */
export const ioTsNonStrictObjectInterpreter: ModelAlgebraObject2<IoTsURI> = {
  _F: IoTsURI,
  interface: <PropsE, PropsA, R>(props: PropsKind2<IoTsURI, PropsE, PropsA, R>, name: string) => (env: R) =>
    new IOTSType<PropsE, PropsA>(t.type(projectFieldWithEnv(props, env)('type'), name) as any),
  interfaceCfg: <PropsE, PropsA, R>(props: PropsKind2<IoTsURI, PropsE, PropsA, R>, name: string) => <
    C extends ConfigsForType<PropsE, PropsA>
  >(
    config: C
  ) => (env: R & ConfigsEnvs<C>) =>
    new IOTSType<PropsE, PropsA>(
      iotsApplyConfig(config)(t.type(projectFieldWithEnv(props, env)('type'), name) as any, env)
    ),
  partial: <PropsE, PropsA, R>(props: PropsKind2<IoTsURI, PropsE, PropsA, R>, name: string) => (env: R) =>
    new IOTSType<Partial<PropsE>, Partial<PropsA>>(t.partial(projectFieldWithEnv(props, env)('type'), name) as any),
  partialCfg: <PropsE, PropsA, R>(props: PropsKind2<IoTsURI, PropsE, PropsA, R>, name: string) => <
    C extends ConfigsForType<PropsE, PropsA>
  >(
    config: C
  ) => (env: R & ConfigsEnvs<C>) =>
    new IOTSType<Partial<PropsE>, Partial<PropsA>>(
      iotsApplyConfig(config)(t.partial(projectFieldWithEnv(props, env)('type'), name) as any, env) as any
    )
}

/**
 *  @since 0.0.1
 */
export const ioTsStrictObjectInterpreter: ModelAlgebraObject2<IoTsURI> = {
  _F: IoTsURI,
  interface: <PropsE, PropsA, R>(props: PropsKind2<IoTsURI, PropsE, PropsA, R>, name: string) => (env: R) =>
    new IOTSType<PropsE, PropsA>(t.strict(projectFieldWithEnv(props, env)('type'), name) as any),
  interfaceCfg: <PropsE, PropsA, R>(props: PropsKind2<IoTsURI, PropsE, PropsA, R>, name: string) => <
    C extends ConfigsForType<PropsE, PropsA>
  >(
    config: C
  ) => (env: R & ConfigsEnvs<C>) =>
    new IOTSType<PropsE, PropsA>(
      iotsApplyConfig(config)(t.strict(projectFieldWithEnv(props, env)('type'), name) as any, env)
    ),
  partial: <PropsE, PropsA, R>(props: PropsKind2<IoTsURI, PropsE, PropsA, R>, name: string) => (env: R) =>
    new IOTSType<Partial<PropsE>, Partial<PropsA>>(
      t.exact(t.partial(projectFieldWithEnv(props, env)('type'), name)) as any
    ),
  partialCfg: <PropsE, PropsA, R>(props: PropsKind2<IoTsURI, PropsE, PropsA, R>, name: string) => <
    C extends ConfigsForType<PropsE, PropsA>
  >(
    config: C
  ) => (env: R & ConfigsEnvs<C>) =>
    new IOTSType<Partial<PropsE>, Partial<PropsA>>(
      iotsApplyConfig(config)(t.exact(t.partial(projectFieldWithEnv(props, env)('type'), name)) as any, env) as any
    )
}

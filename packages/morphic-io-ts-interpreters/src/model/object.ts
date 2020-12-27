import type { AnyEnv, ConfigsForType } from '@morphic-ts/common/lib/config'
import { memo, projectFieldWithEnv } from '@morphic-ts/common/lib/utils'
import type { AnyProps, ModelAlgebraObject, PropsA, PropsE, PropsKind } from '@morphic-ts/model-algebras/lib/object'
import * as t from 'io-ts'

import { iotsApplyConfig } from '../config'
import { IOTSType, IoTsURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const ioTsNonStrictObjectInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraObject<IoTsURI, Env> => ({
    _F: IoTsURI,
    interface: <Props extends AnyProps<Props, Env>>(
      props: Props,
      name: string,
      config?: ConfigsForType<Env, Readonly<PropsE<Props>>, Readonly<PropsA<Props>>>
    ) => (env: Env) =>
      new IOTSType<PropsE<Props>, PropsA<Props>>(
        iotsApplyConfig(config)(t.type(projectFieldWithEnv(props as any, env)('type'), name) as any, env)
      ),
    partial: <Props extends AnyProps<Props, Env>>(
      props: Props,
      name: string,
      config?: ConfigsForType<Env, Partial<Readonly<PropsE<Props>>>, Partial<Readonly<PropsA<Props>>>>
    ) => (env: Env) =>
      new IOTSType<Partial<PropsE<Props>>, Partial<PropsA<Props>>>(
        iotsApplyConfig(config)(t.partial(projectFieldWithEnv(props as any, env)('type'), name) as any, env) as any
      ),
    both: <Props extends AnyProps<Props, Env>, PartialProps extends AnyProps<PartialProps, Env>>(
      props: PropsKind<IoTsURI, PropsE<Props>, PropsA<Props>, Env>,
      partial: PropsKind<IoTsURI, PropsE<PartialProps>, PropsA<PartialProps>, Env>,
      name: string,
      config?: ConfigsForType<
        Env,
        Readonly<PropsE<Props> & Partial<PropsE<PartialProps>>>,
        Readonly<PropsA<Props> & Partial<PropsA<PartialProps>>>
      >
    ) => (env: Env) =>
      new IOTSType<
        Readonly<PropsE<Props> & Partial<PropsE<PartialProps>>>,
        Readonly<PropsA<Props> & Partial<PropsA<PartialProps>>>
      >(
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
  <Env extends AnyEnv>(): ModelAlgebraObject<IoTsURI, Env> => ({
    _F: IoTsURI,
    interface: <Props extends AnyProps<Props, Env>>(
      props: Props,
      name: string,
      config?: ConfigsForType<Env, Readonly<PropsE<Props>>, Readonly<PropsA<Props>>>
    ) => (env: Env) =>
      new IOTSType<PropsE<Props>, PropsA<Props>>(
        iotsApplyConfig(config)(t.strict(projectFieldWithEnv(props as any, env)('type'), name) as any, env)
      ),
    partial: <Props extends AnyProps<Props, Env>>(
      props: Props,
      name: string,
      config?: ConfigsForType<Env, Partial<Readonly<PropsE<Props>>>, Partial<Readonly<PropsA<Props>>>>
    ) => (env: Env) =>
      new IOTSType<Partial<PropsE<Props>>, Partial<PropsA<Props>>>(
        iotsApplyConfig(config)(
          t.exact(t.partial(projectFieldWithEnv(props as any, env)('type'), name)) as any,
          env
        ) as any
      ),
    both: <Props extends AnyProps<Props, Env>, PartialProps extends AnyProps<PartialProps, Env>>(
      props: PropsKind<IoTsURI, PropsE<Props>, PropsA<Props>, Env>,
      partial: PropsKind<IoTsURI, PropsE<PartialProps>, PropsA<PartialProps>, Env>,
      name: string,
      config?: ConfigsForType<
        Env,
        Readonly<PropsE<Props> & Partial<PropsE<PartialProps>>>,
        Readonly<PropsA<Props> & Partial<PropsA<PartialProps>>>
      >
    ) => (env: Env) =>
      new IOTSType<
        Readonly<PropsE<Props> & Partial<PropsE<PartialProps>>>,
        Readonly<PropsA<Props> & Partial<PropsA<PartialProps>>>
      >(
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

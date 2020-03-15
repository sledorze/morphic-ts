import * as t from 'io-ts'
import { IOTSType, IoTsURI } from '../hkt'
import { ModelAlgebraObject2, PropsKind2 } from '@morphic-ts/model-algebras/lib/object'
import { projectField } from '@morphic-ts/common/lib/utils'
import { ByInterp } from '@morphic-ts/common/lib/core'
import { ObjectInterfaceConfig } from '@morphic-ts/algebras/lib/hkt'
import { Customize, applyCustomize } from './common'

declare module '@morphic-ts/algebras/lib/hkt' {
  /**
   *  @since 0.0.1
   */
  export interface ObjectInterfaceConfig<E, A> {
    [IoTsURI]: Customize<E, A> | undefined
  }
  /**
   *  @since 0.0.1
   */
  export interface ObjectPartialConfig<E, A> {
    [IoTsURI]: Customize<E, A> | undefined
  }
}

/**
 *  @since 0.0.1
 */
export const ioTsNonStrictObjectInterpreter: ModelAlgebraObject2<IoTsURI> = {
  _F: IoTsURI,
  interface: <PropsE, PropsA>(
    props: PropsKind2<IoTsURI, PropsE, PropsA>,
    name: string,
    config: ByInterp<ObjectInterfaceConfig<PropsE, PropsA>, IoTsURI>
  ) => new IOTSType<PropsE, PropsA>(applyCustomize(config)(t.type(projectField(props)('type'), name) as any)),
  partial: <PropsE, PropsA>(
    props: PropsKind2<IoTsURI, PropsE, PropsA>,
    name: string,
    config: ByInterp<ObjectInterfaceConfig<PropsE, PropsA>, IoTsURI>
  ) =>
    new IOTSType<Partial<PropsE>, Partial<PropsA>>(
      applyCustomize(config)(t.partial(projectField(props)('type'), name) as any) as any
    )
}

/**
 *  @since 0.0.1
 */
export const ioTsStrictObjectInterpreter: ModelAlgebraObject2<IoTsURI> = {
  _F: IoTsURI,
  interface: <PropsE, PropsA>(
    props: PropsKind2<IoTsURI, PropsE, PropsA>,
    name: string,
    config: ByInterp<ObjectInterfaceConfig<PropsE, PropsA>, IoTsURI>
  ) => new IOTSType<PropsE, PropsA>(applyCustomize(config)(t.strict(projectField(props)('type'), name) as any)),
  partial: <PropsE, PropsA>(
    props: PropsKind2<IoTsURI, PropsE, PropsA>,
    name: string,
    config: ByInterp<ObjectInterfaceConfig<PropsE, PropsA>, IoTsURI>
  ) =>
    new IOTSType<Partial<PropsE>, Partial<PropsA>>(
      applyCustomize(config)(t.exact(t.partial(projectField(props)('type'), name)) as any) as any
    )
}

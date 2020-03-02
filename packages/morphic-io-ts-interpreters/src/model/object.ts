import * as t from 'io-ts'
import { IOTSType, IoTsURI } from '../hkt'
import { ModelAlgebraObject2 } from '@morphic-ts/model-algebras/lib/object'
import { projectField } from '@morphic-ts/common/lib/utils'
import { identity } from 'fp-ts/lib/function'

declare module '@morphic-ts/algebras/lib/hkt' {
  /**
   *  @since 0.0.1
   */
  export interface ObjectInterfaceConfig {
    [IoTsURI]: Customize<any, any> | undefined
  }
  /**
   *  @since 0.0.1
   */
  export interface ObjectPartialConfig {
    [IoTsURI]: Customize<any, any> | undefined
  }
}

interface Customize<E, A> {
  (a: t.Type<A, E, unknown>): t.Type<A, E, unknown>
}

const applyCustomize = <E, A>(c: { [IoTsURI]?: Customize<E, A> } | undefined) =>
  c !== undefined ? c[IoTsURI] ?? identity : identity

/**
 *  @since 0.0.1
 */
export const ioTsNonStrictObjectInterpreter: ModelAlgebraObject2<IoTsURI> = {
  _F: IoTsURI,
  interface: (props, name, config) =>
    new IOTSType(applyCustomize(config)(t.type(projectField(props)('type'), name) as any)),
  partial: (props, name, config) =>
    new IOTSType(applyCustomize(config)(t.partial(projectField(props)('type'), name) as any))
}

/**
 *  @since 0.0.1
 */
export const ioTsStrictObjectInterpreter: ModelAlgebraObject2<IoTsURI> = {
  _F: IoTsURI,
  interface: (props, name, config) =>
    new IOTSType(applyCustomize(config)(t.strict(projectField(props)('type'), name) as any)),
  partial: (props, name, config) =>
    new IOTSType(applyCustomize(config)(t.exact(t.partial(projectField(props)('type'), name)) as any))
}

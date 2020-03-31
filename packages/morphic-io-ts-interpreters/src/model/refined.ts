import * as t from 'io-ts'
import { IOTSType, IoTsURI } from '../hkt'
import { ModelAlgebraRefined2 } from '@morphic-ts/model-algebras/lib/refined'
import { identity } from 'fp-ts/lib/function'
// import { applyCustomize } from './common'

declare module '@morphic-ts/algebras/lib/hkt' {
  export interface RefinedConfig<E, A> {
    [IoTsURI]: Customize<E, A> | undefined
  }
}

export interface Customize<E, A> {
  <B>(a: t.BrandC<t.Type<A, E, unknown>, B>): t.BrandC<t.Type<A, E, unknown>, B> // t.Type<A, E, unknown>
}
export const applyCustomize = <E, A>(c: { [IoTsURI]?: Customize<E, A> } | undefined) =>
  c !== undefined ? c[IoTsURI] ?? identity : identity

/**
 *  @since 0.0.1
 */
export const ioTsRefinedInterpreter: ModelAlgebraRefined2<IoTsURI> = {
  _F: IoTsURI,
  refined: (a, ref, name, config) => new IOTSType(applyCustomize(config)(t.brand(a(env).type, ref, name)))
}

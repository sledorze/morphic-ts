import * as t from 'io-ts'
import { IOTSType, IoTsURI } from '../hkt'
import { ModelAlgebraRefined2 } from '@morphic-ts/model-algebras/lib/refined'
import { identity } from 'fp-ts/lib/function'

declare module '@morphic-ts/algebras/lib/hkt' {
  export interface RefinedConfig<RC, E, A> {
    [IoTsURI]: Customize<RC, E, A> | undefined
  }
}

export interface Customize<RC, E, A> {
  <B>(a: t.BrandC<t.Type<A, E, unknown>, B>, env: RC): t.BrandC<t.Type<A, E, unknown>, B> // t.Type<A, E, unknown>
}
export const applyCustomize = <RC, E, A>(c: { [IoTsURI]?: Customize<RC, E, A> } | undefined) =>
  c !== undefined ? c[IoTsURI] ?? identity : identity

/**
 *  @since 0.0.1
 */
export const ioTsRefinedInterpreter: ModelAlgebraRefined2<IoTsURI> = {
  _F: IoTsURI,
  refined: (a, ref, name, config) => env => new IOTSType(applyCustomize(config)(t.brand(a(env).type, ref, name), env))
}

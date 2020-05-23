import * as t from 'io-ts'
import { IOTSType, IoTsURI } from '../hkt'
import { ModelAlgebraRefined2 } from '@morphic-ts/model-algebras/lib/refined'
import { iotsApplyConfig } from '../config'
import { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export interface Customize<RC, E, A> {
  <B>(a: t.BrandC<t.Type<A, E, unknown>, B>, env: RC): t.BrandC<t.Type<A, E, unknown>, B> // t.Type<A, E, unknown>
}
const id = <A>(a: A) => a

/**
 *  @since 0.0.1
 */
export const applyCustomize = <RC, E, A>(c: { [IoTsURI]?: Customize<RC, E, A> } | undefined) =>
  c !== undefined ? c[IoTsURI] ?? id : id

/**
 *  @since 0.0.1
 */
export const ioTsRefinedInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraRefined2<IoTsURI, Env> => ({
    _F: IoTsURI,
    refined: (a, ref, name, config) => env =>
      new IOTSType(iotsApplyConfig(config)(t.brand(a(env).type, ref, name), env))
  })
)

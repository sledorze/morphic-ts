import * as t from 'io-ts'
import { IOTSType, IoTsURI } from '../hkt'
import { ModelAlgebraStrMap2 } from '@morphic-ts/model-algebras/lib/str-map'
import { identity } from 'fp-ts/lib/function'

interface Customize<RC, L, A> {
  (a: t.RecordC<t.StringC, t.Type<A, L, unknown>>, env: RC): t.RecordC<t.StringC, t.Type<A, L, unknown>>
}

const applyCustomize = <E, A, RC>(c: { [IoTsURI]?: Customize<RC, E, A> } | undefined) =>
  c !== undefined ? c[IoTsURI] ?? identity : identity

/**
 *  @since 0.0.1
 */
export const ioTsStrMapInterpreter: ModelAlgebraStrMap2<IoTsURI> = {
  _F: IoTsURI,
  strMap: codomain => env => new IOTSType(t.record(t.string, codomain(env).type)),
  strMapCfg: codomain => config => env =>
    new IOTSType(applyCustomize(config)(t.record(t.string, codomain(env).type), env))
}

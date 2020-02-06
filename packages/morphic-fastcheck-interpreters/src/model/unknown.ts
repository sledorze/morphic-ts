import { FastCheckType, FastCheckURI } from '..'
import { ModelAlgebraUnknown1 } from 'morphic-model-algebras/lib/unknown'
import { identity } from 'fp-ts/lib/function'
import { Arbitrary, anything } from 'fast-check'

declare module 'morphic-algebras/lib/hkt' {
  interface UnknownConfig {
    [FastCheckURI]: Customize<unknown> | undefined
  }
}

interface Customize<A> {
  (a: Arbitrary<A>): Arbitrary<A>
}

const applyCustomize = <A>(c: { [FastCheckURI]?: Customize<A> } | undefined) =>
  c !== undefined ? c[FastCheckURI] ?? identity : identity

/**
 *  @since 0.0.1
 */
export const fastCheckUnknownInterpreter: ModelAlgebraUnknown1<FastCheckURI> = {
  _F: FastCheckURI,
  unknown: configs => new FastCheckType(applyCustomize(configs)(anything()))
}

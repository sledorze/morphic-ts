import * as fc from 'fast-check'
import { FastCheckType, FastCheckURI } from '..'
import { ModelAlgebraUnknown1 } from '../../model-algebras/unknown'
import { identity } from 'fp-ts/lib/function'

declare module '../../algebras/hkt' {
  interface UnknownConfig {
    [FastCheckURI]: Customize<unknown> | undefined
  }
}

interface Customize<A> {
  (a: fc.Arbitrary<A>): fc.Arbitrary<A>
}

const applyCustomize = <A>(c: { [FastCheckURI]?: Customize<A> } | undefined) =>
  c !== undefined ? c[FastCheckURI] ?? identity : identity

export const fastCheckUnknownInterpreter: ModelAlgebraUnknown1<FastCheckURI> = {
  unknown: configs => new FastCheckType(applyCustomize(configs)(fc.anything()))
}

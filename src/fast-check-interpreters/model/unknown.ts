import { FastCheckType, FastCheckURI } from '..'
import { ModelAlgebraUnknown1 } from '../../model-algebras/unknown'
import { identity } from 'fp-ts/lib/function'
import { Arbitrary, anything } from 'fast-check'

declare module '../../algebras/hkt' {
  interface UnknownConfig {
    [FastCheckURI]: Customize<unknown> | undefined
  }
}

interface Customize<A> {
  (a: Arbitrary<A>): Arbitrary<A>
}

const applyCustomize = <A>(c: { [FastCheckURI]?: Customize<A> } | undefined) =>
  c !== undefined ? c[FastCheckURI] ?? identity : identity

export const fastCheckUnknownInterpreter: ModelAlgebraUnknown1<FastCheckURI> = {
  unknown: configs => new FastCheckType(applyCustomize(configs)(anything()))
}

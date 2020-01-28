import { Arbitrary } from 'fast-check'
import { genConfig } from '../common/core'

export const FastCheckURI = Symbol()
export type FastCheckURI = typeof FastCheckURI

export class FastCheckType<A> {
  constructor(public arb: Arbitrary<A>) {}
}

declare module '../common/HKT' {
  interface URItoKind<A> {
    [FastCheckURI]: FastCheckType<A>
  }
}

export const fastCheckConfig = genConfig(FastCheckURI)

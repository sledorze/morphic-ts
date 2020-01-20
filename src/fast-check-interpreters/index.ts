import * as fc from 'fast-check'
import {} from 'fast-check/lib/types/check/arbitrary/Arbitrary'

export const FastCheckURI = Symbol()
export type FastCheckURI = typeof FastCheckURI

export class FastCheckType<A> {
  constructor(public arb: fc.Arbitrary<A>) {}
}

declare module '../common/HKT' {
  interface URItoKind<A> {
    [FastCheckURI]: FastCheckType<A>
  }
}

import * as fc from 'fast-check'
import {} from 'fast-check/lib/types/check/arbitrary/Arbitrary'

export const URI = 'FastCheckType'
export type URI = typeof URI

export class FastCheckType<A> {
  constructor(public arb: fc.Arbitrary<A>) {}
}

declare module '../../HKT' {
  interface URItoKind<A> {
    FastCheckType: FastCheckType<A>
  }
}

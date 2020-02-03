import { Arbitrary } from 'fast-check'
import { genConfig } from '@sledorze/morphic-common/lib/core'

export const FastCheckURI = Symbol()
export type FastCheckURI = typeof FastCheckURI

export class FastCheckType<A> {
  _A!: A
  _URI!: FastCheckURI
  constructor(public arb: Arbitrary<A>) {}
}

declare module '@sledorze/morphic-common/lib/HKT' {
  interface URItoKind<A> {
    [FastCheckURI]: FastCheckType<A>
  }
}

export const fastCheckConfig = genConfig(FastCheckURI)

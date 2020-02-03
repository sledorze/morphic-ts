import { Ord } from 'fp-ts/lib/Ord'
import { genConfig } from '@sledorze/morphic-common/lib/core'

export const OrdURI = Symbol()
export type OrdURI = typeof OrdURI

export class OrdType<A> {
  _A!: A
  _URI!: OrdURI
  constructor(public ord: Ord<A>) {}
}

declare module '@sledorze/morphic-common/lib/HKT' {
  interface URItoKind<A> {
    [OrdURI]: OrdType<A>
  }
}

export const ordConfig = genConfig(OrdURI)

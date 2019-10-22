import { Ord } from 'fp-ts/lib/Ord'

export const URI = 'OrdType'
export type URI = typeof URI

export class OrdType<A> {
  constructor(public ord: Ord<A>) {}
}

declare module '../../HKT' {
  interface URItoKind<A> {
    OrdType: OrdType<A>
  }
}

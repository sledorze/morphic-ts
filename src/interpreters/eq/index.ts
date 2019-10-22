import { Eq } from 'fp-ts/lib/Eq'

export const URI = 'EqType'
export type URI = typeof URI

export class EqType<A> {
  constructor(public eq: Eq<A>) {}
}

declare module '../../HKT' {
  interface URItoKind<A> {
    [URI]: EqType<A>
  }
}

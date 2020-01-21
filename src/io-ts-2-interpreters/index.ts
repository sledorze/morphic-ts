import * as t from 'io-ts'

export const IoTs2URI = Symbol()
export type IoTs2URI = typeof IoTs2URI

export class IOTS2Type<O, A> {
  constructor(public type: t.Type<A, O>) {}
}

declare module '../common/HKT' {
  interface URItoKind2<E, A> {
    [IoTs2URI]: IOTS2Type<E, A>
  }
}

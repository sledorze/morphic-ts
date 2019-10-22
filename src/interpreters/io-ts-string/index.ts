import * as t from 'io-ts'

export const URI = 'IOTSStringType'
export type URI = typeof URI

export class IOTSStringType<O, A> {
  constructor(public type: t.Type<A, O>) {}
}

declare module '../../HKT' {
  interface URItoKind2<E, A> {
    IOTSStringType: IOTSStringType<E, A>
  }
}

import * as t from 'io-ts'

export const URI = 'IOTSType'
export type URI = typeof URI

export class IOTSType<A> {
  constructor(public type: t.Type<A, unknown>) {}
}

declare module '../../HKT' {
  interface URItoKind<A> {
    IOTSType: IOTSType<A>
  }
}

import * as t from 'io-ts'

export const IoTsStringURI = Symbol()
export type IoTsStringURI = typeof IoTsStringURI

export class IOTSStringType<O, A> {
  constructor(public type: t.Type<A, O>) {}
}

declare module '../../common/HKT' {
  interface URItoKind2<E, A> {
    [IoTsStringURI]: IOTSStringType<E, A>
  }
}

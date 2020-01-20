import * as t from 'io-ts'

export const IoTsURI = Symbol()
export type IoTsURI = typeof IoTsURI

export class IOTSType<A> {
  constructor(public type: t.Type<A, unknown>) {}
}

declare module '../../common/HKT' {
  interface URItoKind<A> {
    [IoTsURI]: IOTSType<A>
  }
}

export interface IOTS<Configs> {
  [IoTsURI]: Configs
}

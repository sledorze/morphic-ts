import * as t from 'io-ts'
import { genConfig } from '../common/core'

export const IoTsURI = Symbol()
export type IoTsURI = typeof IoTsURI

export class IOTSType<O, A> {
  constructor(public type: t.Type<A, O>) {}
}

declare module '../common/HKT' {
  interface URItoKind2<E, A> {
    [IoTsURI]: IOTSType<E, A>
  }
}

export const iotsConfig = genConfig(IoTsURI)

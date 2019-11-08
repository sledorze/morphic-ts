import { OptionalJSONSchema } from '../../json-schema/json-schema-ctors'

export const URI = 'JsonSchema'
export type URI = typeof URI

export class JsonSchema<A> {
  constructor(public schema: () => OptionalJSONSchema) {}
}

declare module '../../HKT' {
  interface URItoKind<A> {
    [URI]: JsonSchema<A>
  }
}

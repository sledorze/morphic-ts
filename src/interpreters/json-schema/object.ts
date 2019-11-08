import { ModelAlgebraObject1 } from '../../algebras/object'
import { JsonSchema, URI } from '.'
import { ObjectTypeCtor } from '../../json-schema/json-schema-ctors'
import { record } from 'fp-ts'
import { tuple } from 'fp-ts/lib/function'

export const jsonSchemaObjectInterpreter: ModelAlgebraObject1<URI> = {
  interface: props =>
    new JsonSchema(() => ObjectTypeCtor(false, record.toArray(props).map(([k, v]) => tuple(k, v.schema())))),
  partial: props =>
    new JsonSchema(() => ObjectTypeCtor(true, record.toArray(props).map(([k, v]) => tuple(k, v.schema()))))
}

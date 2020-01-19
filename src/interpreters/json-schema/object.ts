import { ModelAlgebraObject1 } from '../../algebras/object'
import { JsonSchema, JsonSchemaURI, addSchema, resolveRefJsonSchema, arrayTraverseStateEither } from '.'
import { ObjectTypeCtor, notOptional } from '../../json-schema/json-schema-ctors'
import { record } from 'fp-ts'
import { tuple } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'
import * as SE from '../../StateEither'
import { Ref } from '../../json-schema/json-schema'

export const jsonSchemaObjectInterpreter: ModelAlgebraObject1<JsonSchemaURI> = {
  interface: (props, name) =>
    new JsonSchema(
      pipe(
        arrayTraverseStateEither(record.toArray(props), ([k, v]) =>
          pipe(
            v.schema,
            SE.map(schema => tuple(k, schema))
          )
        ),
        SE.chain(props => resolveRefJsonSchema(ObjectTypeCtor(false, props).json)),
        SE.chain(addSchema(name)),
        SE.map(_ => notOptional(Ref(name)))
      )
    ),
  partial: (props, name) =>
    new JsonSchema(
      pipe(
        arrayTraverseStateEither(record.toArray(props), ([k, v]) =>
          pipe(
            v.schema,
            SE.map(schema => tuple(k, schema))
          )
        ),
        SE.chain(props => resolveRefJsonSchema(ObjectTypeCtor(true, props).json)),
        SE.chain(addSchema(name)),
        SE.map(_ => notOptional(Ref(name)))
      )
    )
}

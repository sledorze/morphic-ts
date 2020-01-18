import { ModelAlgebraObject1 } from '../../algebras/object'
import { JsonSchema, JsonSchemaURI, addSchema } from '.'
import { ObjectTypeCtor, notOptional } from '../../json-schema/json-schema-ctors'
import { record, array } from 'fp-ts'
import { tuple } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'
import * as SE from '../../StateEither'
import { Ref, JSONSchema } from '../../json-schema/json-schema'

const arrayTraverseStateEither = array.array.traverse(SE.stateEither)

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
        SE.chain(props => addSchema(name)(ObjectTypeCtor(false, props).json as JSONSchema)),
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
        SE.chain(props => addSchema(name)(ObjectTypeCtor(true, props).json as JSONSchema)),
        SE.map(_ => notOptional(Ref(name)))
      )
    )
}

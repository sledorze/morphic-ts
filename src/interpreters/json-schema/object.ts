import { ModelAlgebraObject1 } from '../../algebras/object'
import { JsonSchema, JsonSchemaURI } from '.'
import { ObjectTypeCtor } from '../../json-schema/json-schema-ctors'
import { record, array } from 'fp-ts'
import { tuple } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'
import * as SE from '../../StateEither'

const arrayTraverseStateEither = array.array.traverse(SE.stateEither)

export const jsonSchemaObjectInterpreter: ModelAlgebraObject1<JsonSchemaURI> = {
  interface: props =>
    new JsonSchema(
      pipe(
        arrayTraverseStateEither(record.toArray(props), ([k, v]) =>
          pipe(
            v.schema,
            SE.map(schema => tuple(k, schema))
          )
        ),
        SE.map(props => ObjectTypeCtor(false, props))
      )
    ),
  partial: props =>
    new JsonSchema(
      pipe(
        arrayTraverseStateEither(record.toArray(props), ([k, v]) =>
          pipe(
            v.schema,
            SE.map(schema => tuple(k, schema))
          )
        ),
        SE.map(props => ObjectTypeCtor(true, props))
      )
    )
}

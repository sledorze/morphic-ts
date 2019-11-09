import { ModelAlgebraObject1 } from '../../algebras/object'
import { JsonSchema, URI } from '.'
import { ObjectTypeCtor } from '../../json-schema/json-schema-ctors'
import { record, either, array } from 'fp-ts'
import { tuple } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'

const arrayTraverseEither = array.array.traverse(either.either)

export const jsonSchemaObjectInterpreter: ModelAlgebraObject1<URI> = {
  interface: props =>
    new JsonSchema(
      pipe(
        arrayTraverseEither(record.toArray(props), ([k, v]) =>
          pipe(
            v.schema,
            either.map(schema => tuple(k, schema))
          )
        ),
        either.map(props => ObjectTypeCtor(false, props))
      )
    ),
  partial: props =>
    new JsonSchema(
      pipe(
        arrayTraverseEither(record.toArray(props), ([k, v]) =>
          pipe(
            v.schema,
            either.map(schema => tuple(k, schema))
          )
        ),
        either.map(props => ObjectTypeCtor(true, props))
      )
    )
}

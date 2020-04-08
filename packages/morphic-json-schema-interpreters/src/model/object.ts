import { ModelAlgebraObject1 } from '@morphic-ts/model-algebras/lib/object'
import { JsonSchema, JsonSchemaURI } from '../hkt'
import { ObjectTypeCtor, notOptional } from '../json-schema/json-schema-ctors'
import { record } from 'fp-ts'
import { tuple } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'
import * as SE from 'fp-ts-contrib/lib/StateEither'
import { Ref } from '../json-schema/json-schema'
import { arrayTraverseStateEither, resolveRefJsonSchema, addSchema } from '../utils'

/**
 *  @since 0.0.1
 */
export const jsonSchemaObjectInterpreter: ModelAlgebraObject1<JsonSchemaURI> = {
  _F: JsonSchemaURI,
  // TODO: add customize
  interface: (props, name) => _config => env =>
    new JsonSchema(
      pipe(
        arrayTraverseStateEither(record.toArray(props), ([k, v]) =>
          pipe(
            v(env).schema,
            SE.map(schema => tuple(k, schema))
          )
        ),
        SE.chain(props => resolveRefJsonSchema(ObjectTypeCtor(false, props).json)),
        SE.chain(addSchema(name)),
        SE.map(_ => notOptional(Ref(name)))
      )
    ),
  // TODO: add customize
  partial: (props, name) => _config => env =>
    new JsonSchema(
      pipe(
        arrayTraverseStateEither(record.toArray(props), ([k, v]) =>
          pipe(
            v(env).schema,
            SE.map(schema => tuple(k, schema))
          )
        ),
        SE.chain(props => resolveRefJsonSchema(ObjectTypeCtor(true, props).json)),
        SE.chain(addSchema(name)),
        SE.map(_ => notOptional(Ref(name)))
      )
    )
}

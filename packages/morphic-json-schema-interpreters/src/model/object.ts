import { ModelAlgebraObject1 } from '@morphic-ts/model-algebras/lib/object'
import { JsonSchema, JsonSchemaURI } from '../hkt'
import { ObjectTypeCtor, notOptional } from '../json-schema/json-schema-ctors'
import { record } from 'fp-ts'
import { tuple } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'
import * as SE from 'fp-ts-contrib/lib/StateEither'
import { Ref } from '../json-schema/json-schema'
import { arrayTraverseStateEither, resolveRefJsonSchema, addSchema } from '../utils'
import { jsonSchemaApplyConfig } from '../config'

/**
 *  @since 0.0.1
 */
export const jsonSchemaObjectInterpreter: ModelAlgebraObject1<JsonSchemaURI> = {
  _F: JsonSchemaURI,
  interface: (props, name) => env =>
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

  interfaceCfg: (props, name) => config => env =>
    new JsonSchema(
      jsonSchemaApplyConfig(config)(
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
        ),
        env
      )
    ),
  partial: (props, name) => env =>
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
    ),
  partialCfg: (props, name) => config => env =>
    new JsonSchema(
      jsonSchemaApplyConfig(config)(
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
        ),
        env
      )
    )
}

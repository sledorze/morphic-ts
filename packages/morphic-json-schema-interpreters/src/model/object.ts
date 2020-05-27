import type { ModelAlgebraObject1 } from '@morphic-ts/model-algebras/lib/object'
import { JsonSchemaURI } from '../hkt'
import { JsonSchema } from '../hkt'
import { ObjectTypeCtor, notOptional } from '../json-schema/json-schema-ctors'
import { toArray } from 'fp-ts/lib/Record'
import { tuple } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'
import { map as SEmap, chain as SEchain } from 'fp-ts-contrib/lib/StateEither'
import { Ref } from '../json-schema/json-schema'
import { arrayTraverseStateEither, resolveRefJsonSchema, addSchema } from '../utils'
import { jsonSchemaApplyConfig } from '../config'
import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const jsonSchemaObjectInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraObject1<JsonSchemaURI, Env> => ({
    _F: JsonSchemaURI,
    interface: (props, name, config) => env =>
      new JsonSchema(
        jsonSchemaApplyConfig(config)(
          pipe(
            arrayTraverseStateEither(toArray(props), ([k, v]) =>
              pipe(
                v(env).schema,
                SEmap(schema => tuple(k, schema))
              )
            ),
            SEchain(props => resolveRefJsonSchema(ObjectTypeCtor(false, props).json)),
            SEchain(addSchema(name)),
            SEmap(_ => notOptional(Ref(name)))
          ),
          env
        )
      ),
    partial: (props, name, config) => env =>
      new JsonSchema(
        jsonSchemaApplyConfig(config)(
          pipe(
            arrayTraverseStateEither(toArray(props), ([k, v]) =>
              pipe(
                v(env).schema,
                SEmap(schema => tuple(k, schema))
              )
            ),
            SEchain(props => resolveRefJsonSchema(ObjectTypeCtor(true, props).json)),
            SEchain(addSchema(name)),
            SEmap(_ => notOptional(Ref(name)))
          ),
          env
        )
      )
  })
)

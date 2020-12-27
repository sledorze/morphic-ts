import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraObject } from '@morphic-ts/model-algebras/lib/object'
import { tuple } from 'fp-ts/function'
import { pipe } from 'fp-ts/pipeable'
import { toArray } from 'fp-ts/Record'
import { chain as SEchain, map as SEmap } from 'fp-ts-contrib/lib/StateEither'

import { jsonSchemaApplyConfig } from '../config'
import { JsonSchema, JsonSchemaURI } from '../hkt'
import { Ref } from '../json-schema/json-schema'
import { makeOptional, notOptional, ObjectTypeCtor } from '../json-schema/json-schema-ctors'
import { addSchema, arrayTraverseStateEither, resolveRefJsonSchema } from '../utils'

/**
 *  @since 0.0.1
 */
export const jsonSchemaObjectInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraObject<JsonSchemaURI, Env> => ({
    _F: JsonSchemaURI,
    interface: (props, name, config) => env =>
      new JsonSchema(
        jsonSchemaApplyConfig(config)(
          pipe(
            arrayTraverseStateEither(toArray(props), ([k, v]) =>
              pipe(
                (v as any)(env).schema,
                SEmap(schema => tuple(k, schema))
              )
            ) as any,
            SEchain(props => resolveRefJsonSchema(ObjectTypeCtor(props as any).json)),
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
                (v as any)(env).schema,
                SEmap(schema => tuple(k, makeOptional(true)((schema as any).json)))
              )
            ) as any,
            SEchain(props => resolveRefJsonSchema(ObjectTypeCtor(props as any).json)),
            SEchain(addSchema(name)),
            SEmap(_ => notOptional(Ref(name)))
          ),
          env
        )
      ),
    both: (props, partial, name, config) => env => {
      const nonPartialprops = pipe(
        arrayTraverseStateEither(toArray(props), ([k, v]) =>
          pipe(
            v(env).schema,
            SEmap(schema => tuple(k, schema))
          )
        )
      )
      const partialProps = pipe(
        arrayTraverseStateEither(toArray(partial), ([k, v]) =>
          pipe(
            v(env).schema,
            SEmap(schema => tuple(k, makeOptional(true)(schema.json)))
          )
        )
      )

      return new JsonSchema(
        jsonSchemaApplyConfig(config)(
          pipe(
            nonPartialprops,
            SEchain(nonPartialprops =>
              pipe(
                partialProps,
                SEchain(partialProps =>
                  resolveRefJsonSchema(ObjectTypeCtor([...partialProps, ...nonPartialprops]).json)
                )
              )
            ),
            SEchain(addSchema(name)),
            SEmap(_ => notOptional(Ref(name)))
          ),
          env
        )
      )
    }
  })
)

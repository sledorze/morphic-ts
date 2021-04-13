import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraObject } from '@morphic-ts/model-algebras/lib/object'
import { tuple } from 'fp-ts/function'
import { pipe } from 'fp-ts/pipeable'
import { toArray } from 'fp-ts/Record'
import { chain as SEchain, map as SEmap } from 'fp-ts-contrib/lib/StateEither'

import { jsonSchemaApplyConfig } from '../config'
import { JsonSchema, JsonSchemaURI } from '../hkt'
import { makeOptional, ObjectTypeCtor } from '../json-schema/json-schema-ctors'
import { addNotOptionalNamedSchemaAndRef, arrayTraverseStateEither, getName, resolveRefJsonSchema } from '../utils'

/**
 *  @since 0.0.1
 */
export const jsonSchemaObjectInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraObject<JsonSchemaURI, Env> => ({
    _F: JsonSchemaURI,
    interface: (props, config) => env =>
      new JsonSchema(
        jsonSchemaApplyConfig(config?.conf)(
          pipe(
            arrayTraverseStateEither(toArray(props), ([k, v]) =>
              pipe(
                (v as any)(env).schema,
                SEmap(schema => tuple(k, schema))
              )
            ) as any,
            SEchain(props => resolveRefJsonSchema(ObjectTypeCtor(props as any).json)),
            SEchain(schema =>
              pipe(
                getName(config),
                SEchain(name => addNotOptionalNamedSchemaAndRef(name, schema))
              )
            )
          ),
          env,
          {}
        )
      ),
    partial: (props, config) => env =>
      new JsonSchema(
        jsonSchemaApplyConfig(config?.conf)(
          pipe(
            arrayTraverseStateEither(toArray(props), ([k, v]) =>
              pipe(
                (v as any)(env).schema,
                SEmap(schema => tuple(k, makeOptional(true)((schema as any).json)))
              )
            ) as any,
            SEchain(props => resolveRefJsonSchema(ObjectTypeCtor(props as any).json)),
            SEchain(schema =>
              pipe(
                getName(config),
                SEchain(name => addNotOptionalNamedSchemaAndRef(name, schema))
              )
            )
          ),
          env,
          {}
        )
      ),
    both: (props, partial, config) => env => {
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
        jsonSchemaApplyConfig(config?.conf)(
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
            SEchain(schema =>
              pipe(
                getName(config),
                SEchain(name => addNotOptionalNamedSchemaAndRef(name, schema))
              )
            )
          ),
          env,
          {}
        )
      )
    }
  })
)

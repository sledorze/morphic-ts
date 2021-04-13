import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraPrimitive } from '@morphic-ts/model-algebras/lib/primitives'
import { tuple } from 'fp-ts/function'
import { pipe } from 'fp-ts/pipeable'
import { Do } from 'fp-ts-contrib/lib/Do'
import {
  fromEither as SEfromEither,
  right as SEright,
  stateEither as SEstateEither
} from 'fp-ts-contrib/lib/StateEither'

import { jsonSchemaApplyConfig } from '../config'
import type { JsonSchemaResult } from '../hkt'
import { JsonSchema, JsonSchemaURI } from '../hkt'
import type { OptionalJSONSchema } from '../json-schema/json-schema-ctors'
import {
  ArrayTypeCtor,
  BooleanTypeCtor,
  LiteralNumberTypeCtor,
  LiteralStringTypeCtor,
  NumberTypeCtor,
  ObjectTypeCtor,
  optional,
  StringTypeCtor,
  TagTypeCtor,
  UnionTypeCtor
} from '../json-schema/json-schema-ctors'

declare module '@morphic-ts/model-algebras/lib/primitives' {
  /**
   * @since 0.0.1
   */

  interface NonEmptyArrayConfig<L, A> {
    [JsonSchemaURI]: {
      schema: JsonSchemaResult<OptionalJSONSchema>
    }
  }
  /**
   * @since 0.0.1
   */
  interface ArrayConfig<L, A> {
    [JsonSchemaURI]: {
      schema: JsonSchemaResult<OptionalJSONSchema>
    }
  }
  /**
   * @since 0.0.1
   */
  interface NullableConfig<L, A> {
    [JsonSchemaURI]: {
      schema: JsonSchemaResult<OptionalJSONSchema>
    }
  }
  /**
   * @since 0.0.1
   */
  interface MutableConfig<L, A> {
    [JsonSchemaURI]: {
      schema: JsonSchemaResult<OptionalJSONSchema>
    }
  }
  /**
   * @since 0.0.1
   */
  interface OptionalConfig<L, A> {
    [JsonSchemaURI]: {
      schema: JsonSchemaResult<OptionalJSONSchema>
    }
  }
  /**
   * @since 0.0.1
   */
  interface EitherConfig<EE, EA, AE, AA> {
    [JsonSchemaURI]: {
      // left: JsonSchemaResult<OptionalJSONSchema>
      // right: JsonSchemaResult<OptionalJSONSchema>
    }
  }
  /**
   * @since 0.0.1
   */
  interface OptionConfig<L, A> {
    [JsonSchemaURI]: {
      schema: JsonSchemaResult<OptionalJSONSchema>
    }
  }
}

/**
 *  @since 0.0.1
 */
export const jsonSchemaPrimitiveInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraPrimitive<JsonSchemaURI, Env> => ({
    _F: JsonSchemaURI,
    date: config => env =>
      new JsonSchema(
        jsonSchemaApplyConfig(config?.conf)(SEstateEither.of(StringTypeCtor({ format: 'date' })), env, {})
      ),
    string: config => env =>
      new JsonSchema(jsonSchemaApplyConfig(config?.conf)(SEstateEither.of(StringTypeCtor({})), env, {})),
    number: config => env =>
      new JsonSchema(jsonSchemaApplyConfig(config?.conf)(SEstateEither.of(NumberTypeCtor()), env, {})),
    bigint: config => env =>
      new JsonSchema(
        jsonSchemaApplyConfig(config?.conf)(SEstateEither.of(StringTypeCtor({ format: 'bigint' })), env, {})
      ),
    boolean: config => env =>
      new JsonSchema(jsonSchemaApplyConfig(config?.conf)(SEstateEither.of(BooleanTypeCtor()), env, {})),
    stringLiteral: (v, config) => env =>
      new JsonSchema(jsonSchemaApplyConfig(config?.conf)(SEstateEither.of(LiteralStringTypeCtor(v)), env, {})),
    numberLiteral: (v, config) => env =>
      new JsonSchema(jsonSchemaApplyConfig(config?.conf)(SEstateEither.of(LiteralNumberTypeCtor(v)), env, {})),
    oneOfLiterals: (v, config) => env =>
      new JsonSchema(jsonSchemaApplyConfig(config?.conf)(SEstateEither.of(LiteralStringTypeCtor(`${v}`)), env, {})), // TODO: This is a lie
    tag: (v, config) => env =>
      new JsonSchema(jsonSchemaApplyConfig(config?.conf)(SEstateEither.of(TagTypeCtor(v)), env, {})),
    keysOf: (_keys, config) => env =>
      new JsonSchema(
        jsonSchemaApplyConfig(config?.conf)(SEstateEither.of(StringTypeCtor({ enum: Object.keys(_keys) })), env, {})
      ),
    nullable: (getSchema, config) => env =>
      pipe(
        getSchema(env).schema,
        schema =>
          new JsonSchema(
            jsonSchemaApplyConfig(config?.conf)(
              SEstateEither.map(schema, v => optional(v.json)),
              env,
              { schema }
            )
          )
      ),
    optional: (getSchema, config) => env =>
      pipe(
        getSchema(env).schema,
        schema =>
          new JsonSchema(
            jsonSchemaApplyConfig(config?.conf)(
              SEstateEither.map(schema, v => optional(v.json)),
              env,
              { schema }
            )
          )
      ),
    mutable: (getSchema, config) => env =>
      pipe(
        getSchema(env).schema,
        schema => new JsonSchema(jsonSchemaApplyConfig(config?.conf)(schema, env, { schema }))
      ),
    array: (getSchema, config) => env =>
      pipe(
        getSchema(env).schema,
        schema =>
          new JsonSchema(
            jsonSchemaApplyConfig(config?.conf)(
              SEstateEither.chain(schema, schemas => SEfromEither(ArrayTypeCtor({ schemas }))),
              env,
              { schema }
            )
          )
      ),
    nonEmptyArray: (getSchema, config) => env =>
      pipe(
        getSchema(env).schema,
        schema =>
          new JsonSchema(
            jsonSchemaApplyConfig(config?.conf)(
              SEstateEither.chain(schema, schemas => SEfromEither(ArrayTypeCtor({ schemas, minItems: 1 }))),
              env,
              { schema }
            )
          )
      ),
    uuid: config => env =>
      new JsonSchema(
        jsonSchemaApplyConfig(config?.conf)(SEstateEither.of(StringTypeCtor({ format: 'uuid' })), env, {})
      ),
    either: (e, a, config) => env =>
      new JsonSchema(
        jsonSchemaApplyConfig(config?.conf)(
          Do(SEstateEither)
            .bind('e', e(env).schema)
            .bind('a', a(env).schema)
            .bindL('leftE', ({ e }) =>
              SEright(
                ObjectTypeCtor([
                  ['left', e],
                  ['_tag', LiteralStringTypeCtor('Left')]
                ])
              )
            )
            .bindL('rightA', ({ a }) =>
              SEright(
                ObjectTypeCtor([
                  ['right', a],
                  ['_tag', LiteralStringTypeCtor('Right')]
                ])
              )
            )
            .bindL('res', ({ leftE, rightA }) => SEfromEither(UnionTypeCtor([leftE, rightA])))
            .return(({ res }) => res),
          env,
          {}
        )
      ),
    option: (getSchema, config) => env =>
      pipe(
        getSchema(env).schema,
        schema =>
          new JsonSchema(
            jsonSchemaApplyConfig(config?.conf)(
              SEstateEither.chain(schema, v => SEfromEither(UnionTypeCtor([None, GetSome(v)]))),
              env,
              { schema }
            )
          )
      ),
    unknownE: (getSchema, config) => env =>
      pipe(
        getSchema(env).schema,
        schema =>
          new JsonSchema(
            jsonSchemaApplyConfig(config?.conf)(
              SEstateEither.chain(getSchema(env).schema, v => SEfromEither(UnionTypeCtor([None, GetSome(v)]))),
              env,
              { schema }
            )
          )
      )
  })
)
const None = ObjectTypeCtor([['_tag', LiteralStringTypeCtor('None')]])
const someTag = tuple('_tag', LiteralStringTypeCtor('Some'))
const GetSome = (v: OptionalJSONSchema) => ObjectTypeCtor([['value', v], someTag])

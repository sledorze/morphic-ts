import type { AnyEnv } from '@morphic-ts/common/lib/config'
import type { ModelAlgebraPrimitive1 } from '@morphic-ts/model-algebras/lib/primitives'
import { JsonSchema, JsonSchemaURI } from '../hkt'
import {
  StringTypeCtor,
  NumberTypeCtor,
  BooleanTypeCtor,
  LiteralTypeCtor,
  optional,
  ArrayTypeCtor,
  UnionTypeCtor,
  ObjectTypeCtor,
  OptionalJSONSchema
} from '../json-schema/json-schema-ctors'
import {
  stateEither as SEstateEither,
  fromEither as SEfromEither,
  right as SEright
} from 'fp-ts-contrib/lib/StateEither'
import { jsonSchemaApplyConfig } from '../config'
import { memo } from '@morphic-ts/common/lib/utils'
import { pipe } from 'fp-ts/lib/pipeable'
import { Do } from 'fp-ts-contrib/lib/Do'
import { tuple } from 'fp-ts/lib/function'

/**
 *  @since 0.0.1
 */
export const jsonSchemaPrimitiveInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraPrimitive1<JsonSchemaURI, Env> => ({
    _F: JsonSchemaURI,
    date: config => env =>
      new JsonSchema(jsonSchemaApplyConfig(config)(SEstateEither.of(StringTypeCtor({ format: 'date' })), env)),
    string: config => env => new JsonSchema(jsonSchemaApplyConfig(config)(SEstateEither.of(StringTypeCtor({})), env)),
    number: config => env => new JsonSchema(jsonSchemaApplyConfig(config)(SEstateEither.of(NumberTypeCtor()), env)),
    bigint: config => env =>
      new JsonSchema(jsonSchemaApplyConfig(config)(SEstateEither.of(StringTypeCtor({ format: 'bigint' })), env)),
    boolean: config => env => new JsonSchema(jsonSchemaApplyConfig(config)(SEstateEither.of(BooleanTypeCtor()), env)),
    stringLiteral: (v, config) => env =>
      new JsonSchema(jsonSchemaApplyConfig(config)(SEstateEither.of(LiteralTypeCtor(v)), env)),
    keysOf: (_keys, config) => env =>
      new JsonSchema(
        jsonSchemaApplyConfig(config)(SEstateEither.of(StringTypeCtor({ enum: Object.keys(_keys) })), env)
      ),
    nullable: (getSchema, config) => env =>
      new JsonSchema(
        jsonSchemaApplyConfig(config)(
          SEstateEither.map(getSchema(env).schema, v => optional(v.json)),
          env
        )
      ),
    array: (getSchema, config) => env =>
      new JsonSchema(
        jsonSchemaApplyConfig(config)(
          SEstateEither.chain(getSchema(env).schema, schemas => SEfromEither(ArrayTypeCtor({ schemas }))),
          env
        )
      ),
    uuid: config => env =>
      new JsonSchema(jsonSchemaApplyConfig(config)(SEstateEither.of(StringTypeCtor({ format: 'uuid' })), env)),
    either: (e, a, config) => env =>
      new JsonSchema(
        jsonSchemaApplyConfig(config)(
          pipe(
            Do(SEstateEither)
              .bind('e', e(env).schema)
              .bind('a', a(env).schema)
              .bindL('leftE', ({ e }) =>
                SEright(
                  ObjectTypeCtor(false, [
                    ['left', e],
                    ['_tag', LiteralTypeCtor('Left')]
                  ])
                )
              )
              .bindL('rightA', ({ a }) =>
                SEright(
                  ObjectTypeCtor(false, [
                    ['right', a],
                    ['_tag', LiteralTypeCtor('Right')]
                  ])
                )
              )
              .bindL('res', ({ leftE, rightA }) => SEfromEither(UnionTypeCtor([leftE, rightA])))
              .return(({ res }) => res)
          ),
          env
        )
      ),
    option: (getSchema, config) => env =>
      new JsonSchema(
        jsonSchemaApplyConfig(config)(
          SEstateEither.chain(getSchema(env).schema, v => SEfromEither(UnionTypeCtor([None, GetSome(v)]))),
          env
        )
      )
  })
)
const None = ObjectTypeCtor(false, [['_tag', LiteralTypeCtor('None')]])
const someTag = tuple('_tag', LiteralTypeCtor('Some'))
const GetSome = (v: OptionalJSONSchema) => ObjectTypeCtor(false, [['value', v], someTag])

import { fromOption } from 'fp-ts/Either'
import { tuple } from 'fp-ts/function'
import { readonlyArray } from 'fp-ts/lib/ReadonlyArray'
import type { NonEmptyArray } from 'fp-ts/NonEmptyArray'
import { of } from 'fp-ts/NonEmptyArray'
import type { Option } from 'fp-ts/Option'
import { map, some } from 'fp-ts/Option'
import { pipe } from 'fp-ts/pipeable'
import { insertAt, lookup } from 'fp-ts/Record'
import type { StateEither } from 'fp-ts-contrib/lib/StateEither'
import {
  chain,
  fromOption as SEfromOption,
  gets,
  map as SEmap,
  modify,
  stateEither
} from 'fp-ts-contrib/lib/StateEither'

import type { JsonSchemaResult, NamedSchemas } from './hkt'
import type { JSONSchema, SubSchema } from './json-schema/json-schema'
import { isTypeRef, Ref } from './json-schema/json-schema'
import type { OptionalJSONSchema } from './json-schema/json-schema-ctors'
import { JsonSchemaError, makeOptional } from './json-schema/json-schema-ctors'

/**
 *  @since 0.0.1
 */
export const addSchema = (name: string) => (schema: JSONSchema): JsonSchemaResult<void> =>
  modify<NamedSchemas>(insertAt(name, schema))

/**
 *  @since 0.0.1
 */
export const registerSchema = (name: string) => (
  v: OptionalJSONSchema
): StateEither<NamedSchemas, NonEmptyArray<JsonSchemaError>, OptionalJSONSchema> =>
  isTypeRef(v.json)
    ? stateEither.of(v)
    : pipe(
        addSchema(name)(v.json),
        SEmap(_ => makeOptional(v.optional)(Ref(name)))
      )

/**
 *  @since 0.0.1
 */
export const getSchema = (name: string): JsonSchemaResult<Option<JSONSchema>> =>
  gets((s: NamedSchemas) => lookup(name, s))

/**
 *  @since 0.0.1
 */
export const getSchemaStrict = (name: string): JsonSchemaResult<JSONSchema> =>
  pipe(
    getSchema(name),
    chain<NamedSchemas, NonEmptyArray<JsonSchemaError>, Option<JSONSchema>, JSONSchema>(
      SEfromOption(() => of(JsonSchemaError(`cannot find schema ${name}`)))
    )
  )

/**
 *  @since 0.0.1
 */
export const arrayTraverseStateEither = readonlyArray.traverse(stateEither)

/**
 *  @since 0.0.1
 */
export const resolveRef = ({
  json,
  optional
}: OptionalJSONSchema): StateEither<NamedSchemas, NonEmptyArray<JsonSchemaError>, OptionalJSONSchema> =>
  pipe(resolveRefJsonSchema(json), SEmap(makeOptional(optional)))

/**
 *  @since 0.0.1
 */
export const resolveRefJsonSchema = (
  s: SubSchema
): StateEither<NamedSchemas, NonEmptyArray<JsonSchemaError>, JSONSchema> =>
  isTypeRef(s) ? getSchemaStrict(s.$ref) : stateEither.of(s)

/**
 *  @since 0.0.1
 */
export const resolveSubSchema = (ns: NamedSchemas, ref: SubSchema): Option<JSONSchema> =>
  isTypeRef(ref) ? lookup(ref.$ref, ns) : some(ref)

/**
 *  @since 0.0.1
 */
export const resolveSchema = ([{ json }, dic]: [OptionalJSONSchema, NamedSchemas]) =>
  pipe(
    resolveSubSchema(dic, json),
    map(j => tuple(j, dic)),
    fromOption(() => of(JsonSchemaError('cannot resolve ref ')))
  )

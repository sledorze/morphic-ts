import { JsonSchema, JsonSchemaURI } from '../hkt'
import { ModelAlgebraRecursive1 } from '@morphic-ts/model-algebras/lib/recursive'
import { memo } from '@morphic-ts/common/lib/utils'
import { notOptional, JsonSchemaError } from '../json-schema/json-schema-ctors'
import { Ref, isnotTypeRef } from '../json-schema/json-schema'
import { pipe } from 'fp-ts/lib/pipeable'
import * as SE from 'fp-ts-contrib/lib/StateEither'
import { nonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { addSchema, getSchemaStrict } from '../utils'
import { AnyEnv } from '@morphic-ts/common/lib/config'

// FIXME: Create a reference JsonSchema => "$ref": "#/definitions/MySchemaRef" <- Track down how to do that!
/**
 *  @since 0.0.1
 */
export const jsonSchemaRecursiveInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraRecursive1<JsonSchemaURI, Env> => ({
    _F: JsonSchemaURI,
    recursive: <A>(
      rec: (x: (r: Env) => JsonSchema<A>) => (r: Env) => JsonSchema<A>,
      name: string
    ): ((env: Env) => JsonSchema<A>) => {
      const cache = (env: Env) =>
        memo(() =>
          pipe(
            rec(_env => new JsonSchema(SE.stateEither.of(notOptional(Ref(name)))))(env).schema, // call `rec` definition with brand new Ref (named as per the recursion)
            SE.chain(_ =>
              SE.fromPredicate(
                isnotTypeRef,
                _ => nonEmptyArray.of(JsonSchemaError('A type cannot be defined as a pure Ref')) // A Ref should not be resolved as another Ref
              )(_.json)
            ),
            SE.chain(addSchema(name)), // We add the newly created Schema to the dictionnary of Schemas
            SE.chain(_ => getSchemaStrict(name)), // We resolve it and refuse to fail doing it
            SE.map(notOptional)
          )
        )
      return env => new JsonSchema(cache(env)())
    }
  })
)

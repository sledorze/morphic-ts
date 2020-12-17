import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraRecursive1 } from '@morphic-ts/model-algebras/lib/recursive'
import { of as NEof } from 'fp-ts/NonEmptyArray'
import { pipe } from 'fp-ts/pipeable'
import {
  chain as SEchain,
  fromPredicate as SEfromPredicate,
  map as SEmap,
  stateEither as SEstateEither
} from 'fp-ts-contrib/lib/StateEither'

import { JsonSchema, JsonSchemaURI } from '../hkt'
import { isnotTypeRef, Ref } from '../json-schema/json-schema'
import { JsonSchemaError, notOptional } from '../json-schema/json-schema-ctors'
import { addSchema, getSchemaStrict } from '../utils'

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
            rec(_env => new JsonSchema(SEstateEither.of(notOptional(Ref(name)))))(env).schema, // call `rec` definition with brand new Ref (named as per the recursion)
            SEchain(_ =>
              SEfromPredicate(
                isnotTypeRef,
                _ => NEof(JsonSchemaError('A type cannot be defined as a pure Ref')) // A Ref should not be resolved as another Ref
              )(_.json)
            ),
            SEchain(addSchema(name)), // We add the newly created Schema to the dictionnary of Schemas
            SEchain(_ => getSchemaStrict(name)), // We resolve it and refuse to fail doing it
            SEmap(notOptional)
          )
        )
      return env => new JsonSchema(cache(env)())
    }
  })
)

import { JsonSchema, JsonSchemaURI } from '..'
import { ModelAlgebraRecursive1 } from '@sledorze/morphic-model-algebras/lib/recursive'
import { memo } from '@sledorze/morphic-common/lib/utils'
import { notOptional, JsonSchemaError } from '../json-schema/json-schema-ctors'
import { Ref, isnotTypeRef } from '../json-schema/json-schema'
import { pipe } from 'fp-ts/lib/pipeable'
import * as SE from '../StateEither'
import { nonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { addSchema, getSchemaStrict } from '../utils'

// FIXME: Create a reference JsonSchema => "$ref": "#/definitions/MySchemaRef" <- Track down how to do that!
export const jsonSchemaRecursiveInterpreter: ModelAlgebraRecursive1<JsonSchemaURI> = {
  _F: JsonSchemaURI,
  recursive: <A>(rec: (x: JsonSchema<A>) => JsonSchema<A>, name: string): JsonSchema<A> => {
    const cache = memo(() =>
      pipe(
        rec(new JsonSchema(SE.stateEither.of(notOptional(Ref(name))))).schema, // call `rec` definition with brand new Ref (named as per the recursion)
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
    return new JsonSchema(cache())
  }
}

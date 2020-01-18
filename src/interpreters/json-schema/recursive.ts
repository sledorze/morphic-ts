import { JsonSchema, JsonSchemaURI, addSchema, getSchemaStrict, JsonSchemaError } from '.'
import { ModelAlgebraRecursive1 } from '../../algebras/recursive'
import { memo } from '../../utils'
import { notOptional } from '../../json-schema/json-schema-ctors'
import { Ref, isnotTypeRef } from '../../json-schema/json-schema'
import { pipe } from 'fp-ts/lib/pipeable'
import * as SE from '../../StateEither'
import { nonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

// FIXME: Create a reference JsonSchema => "$ref": "#/definitions/MySchemaRef" <- Track down how to do that!
export const jsonSchemaRecursiveInterpreter: ModelAlgebraRecursive1<JsonSchemaURI> = {
  recursive: <A>(rec: (x: JsonSchema<A>) => JsonSchema<A>, name: string): JsonSchema<A> => {
    const cache = memo(() =>
      pipe(
        rec(new JsonSchema(SE.stateEither.of(notOptional(Ref(name))))).schema,
        SE.chain(_ =>
          SE.fromPredicate(isnotTypeRef, _ =>
            nonEmptyArray.of(JsonSchemaError('A type cannot be defined as a pure Ref'))
          )(_.json)
        ),
        SE.chain(addSchema(name)),
        SE.chain(_ => getSchemaStrict(name)),
        SE.map(notOptional)
      )
    )
    return new JsonSchema(cache())
  }
}

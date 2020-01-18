import { ModelAlgebraIntersection1 } from '../../algebras/intersections'
import { JsonSchema, JsonSchemaURI, resolveRefs, addSchema } from '.'
import { IntersectionTypeCtor, notOptional } from '../../json-schema/json-schema-ctors'
import { array } from 'fp-ts'
import { pipe } from 'fp-ts/lib/pipeable'
import * as SE from '../../StateEither'
import { Ref, isTypeRef } from '../../json-schema/json-schema'

const arrayTraverseStateEither = array.array.traverse(SE.stateEither)

export const jsonSchemaIntersectionInterpreter: ModelAlgebraIntersection1<JsonSchemaURI> = {
  intersection: <A>(types: Array<JsonSchema<A>>, name: string) =>
    new JsonSchema<A>(
      pipe(
        arrayTraverseStateEither(types, v => v.schema),
        SE.chain(resolveRefs),
        SE.chainEitherK(IntersectionTypeCtor),
        SE.chain(v =>
          isTypeRef(v.json)
            ? SE.stateEither.of(v)
            : pipe(
                addSchema(name)(v.json),
                SE.map(_ => notOptional(Ref(name)))
              )
        )
      )
    )
}

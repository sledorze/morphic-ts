import { ModelAlgebraIntersection1 } from '../../algebras/intersections'
import { JsonSchema, JsonSchemaURI, addSchema, arrayTraverseStateEither, resolveRef } from '.'
import { IntersectionTypeCtor, notOptional } from '../../json-schema/json-schema-ctors'
import { pipe } from 'fp-ts/lib/pipeable'
import * as SE from '../../StateEither'
import { Ref, isTypeRef } from '../../json-schema/json-schema'

export const jsonSchemaIntersectionInterpreter: ModelAlgebraIntersection1<JsonSchemaURI> = {
  intersection: <A>(types: Array<JsonSchema<A>>, name: string) =>
    new JsonSchema<A>(
      pipe(
        arrayTraverseStateEither(types, v => v.schema),
        SE.chain(v => arrayTraverseStateEither(v, resolveRef)),
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

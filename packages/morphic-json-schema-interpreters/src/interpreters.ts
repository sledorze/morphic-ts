import { merge } from '@morphic-ts/common/lib/utils'

import { jsonSchemaRefinedInterpreter } from './model/refined'
import { jsonSchemaNewtypeInterpreter } from './model/newtype'
import { jsonSchemaUnknownInterpreter } from './model/unknown'
import { jsonSchemaPrimitiveInterpreter } from './model/primitives'
import { jsonSchemaIntersectionInterpreter } from './model/intersections'
import { jsonSchemaObjectInterpreter } from './model/object'
import { jsonSchemaTaggedUnionInterpreter } from './model/tagged-unions'
import { jsonSchemaRecursiveInterpreter } from './model/recursive'
import { jsonSchemaStrMapInterpreter } from './model/str-map'
import { jsonSchemaSetInterpreter } from './model/set'
import { jsonSchemaUnionInterpreter } from './model/unions'
import { AnyEnv } from '@morphic-ts/common/lib/config'

export * from './hkt'

/**
 *  @since 0.0.1
 */
const allModelJsonSchema = <Env extends AnyEnv>() =>
  merge(
    jsonSchemaRefinedInterpreter<Env>(),
    jsonSchemaNewtypeInterpreter<Env>(),
    jsonSchemaUnknownInterpreter<Env>(),
    jsonSchemaPrimitiveInterpreter<Env>(),
    jsonSchemaIntersectionInterpreter<Env>(),
    jsonSchemaObjectInterpreter<Env>(),
    jsonSchemaTaggedUnionInterpreter<Env>(),
    jsonSchemaRecursiveInterpreter<Env>(),
    jsonSchemaStrMapInterpreter<Env>(),
    jsonSchemaSetInterpreter<Env>(),
    jsonSchemaUnionInterpreter<Env>()
  )

/**
 *  @since 0.0.1
 */
export const modelJsonSchemaInterpreter = allModelJsonSchema

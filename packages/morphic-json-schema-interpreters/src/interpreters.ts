import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { merge } from '@morphic-ts/common/lib/utils'

import { memo } from './../../morphic-common/src/utils'
import { jsonSchemaIntersectionInterpreter } from './model/intersections'
import { jsonSchemaNewtypeInterpreter } from './model/newtype'
import { jsonSchemaObjectInterpreter } from './model/object'
import { jsonSchemaPrimitiveInterpreter } from './model/primitives'
import { jsonSchemaRecursiveInterpreter } from './model/recursive'
import { jsonSchemaRefinedInterpreter } from './model/refined'
import { jsonSchemaSetInterpreter } from './model/set'
import { jsonSchemaStrMapInterpreter } from './model/str-map'
import { jsonSchemaTaggedUnionInterpreter } from './model/tagged-unions'
import { jsonSchemaUnionInterpreter } from './model/unions'
import { jsonSchemaUnknownInterpreter } from './model/unknown'

export {} from './model/intersections'
export {} from './model/newtype'
export {} from './model/object'
export {} from './model/primitives'
export {} from './model/recursive'
export {} from './model/refined'
export {} from './model/set'
export {} from './model/str-map'
export {} from './model/tagged-unions'
export {} from './model/unions'
export {} from './model/unknown'

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

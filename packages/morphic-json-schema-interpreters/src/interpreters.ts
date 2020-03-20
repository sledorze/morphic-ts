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

export * from './hkt'

/**
 *  @since 0.0.1
 */
const allModelJsonSchema = merge(
  jsonSchemaRefinedInterpreter,
  jsonSchemaNewtypeInterpreter,
  jsonSchemaUnknownInterpreter,
  jsonSchemaPrimitiveInterpreter,
  jsonSchemaIntersectionInterpreter,
  jsonSchemaObjectInterpreter,
  jsonSchemaTaggedUnionInterpreter,
  jsonSchemaRecursiveInterpreter,
  jsonSchemaStrMapInterpreter,
  jsonSchemaSetInterpreter,
  jsonSchemaUnionInterpreter
)

/**
 *  @since 0.0.1
 */
export const modelJsonSchemaInterpreter = allModelJsonSchema

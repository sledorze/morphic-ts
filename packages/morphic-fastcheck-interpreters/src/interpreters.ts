import { merge } from '@morphic-ts/common/lib/utils'

import { fastCheckRefinedInterpreter } from './model/refined'

import { fastCheckNewtypeInterpreter } from './model/newtype'

import { fastCheckUnknownInterpreter } from './model/unknown'

import { fastCheckPrimitiveInterpreter } from './model/primitives'

import { fastCheckIntersectionInterpreter } from './model/intersections'

import { fastCheckObjectInterpreter } from './model/object'

import { fastCheckUnionInterpreter } from './model/unions'

import { fastCheckTaggedUnionInterpreter } from './model/tagged-unions'

import { fastCheckRecursiveInterpreter } from './model/recursive'

import { fastCheckStrMapInterpreter } from './model/str-map'

import { fastCheckSetInterpreter } from './model/set'

import { fastCheckTermInterpreter } from './model/term'

export * from './hkt'

/**
 *  @since 0.0.1
 */
const allModelFastCheck = merge(
  fastCheckRefinedInterpreter,
  fastCheckNewtypeInterpreter,
  fastCheckUnknownInterpreter,
  fastCheckPrimitiveInterpreter,
  fastCheckIntersectionInterpreter,
  fastCheckObjectInterpreter,
  fastCheckUnionInterpreter,
  fastCheckTaggedUnionInterpreter,
  fastCheckRecursiveInterpreter,
  fastCheckStrMapInterpreter,
  fastCheckSetInterpreter,
  fastCheckTermInterpreter
)

/**
 *  @since 0.0.1
 */
export const modelFastCheckInterpreter = allModelFastCheck

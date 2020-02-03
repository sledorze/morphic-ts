import { merge } from '@sledorze/morphic-common/lib/utils'

import { ordPrimitiveInterpreter } from './primitives'

import { ordIntersectionInterpreter } from './intersections'

import { ordSetInterpreter } from './set'

import { ordStrMapInterpreter } from './str-map'

import { ordTaggedUnionInterpreter } from './tagged-unions'
import { ordNewtypeInterpreter } from './newtype'
import { ordRefinedInterpreter } from './refined'

/**
 *  @since 0.0.1
 */
export const allModelOrd = merge(
  ordRefinedInterpreter,
  ordNewtypeInterpreter,
  ordPrimitiveInterpreter,
  ordIntersectionInterpreter,
  ordSetInterpreter,
  ordStrMapInterpreter,
  ordTaggedUnionInterpreter
)

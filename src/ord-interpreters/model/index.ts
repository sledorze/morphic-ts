import { merge } from '../../common/utils'

import { ordPrimitiveInterpreter } from './primitives'

import { ordIntersectionInterpreter } from './intersections'

import { ordSetInterpreter } from './set'

import { ordStrMapInterpreter } from './str-map'

import { ordTaggedUnionInterpreter } from './tagged-unions'

export const allModelOrd = merge(
  ordPrimitiveInterpreter,
  ordIntersectionInterpreter,
  ordSetInterpreter,
  ordStrMapInterpreter,
  ordTaggedUnionInterpreter
)

import { merge } from '../../common/utils'

import { ordPrimitiveInterpreter } from './primitives'

import { ordIntersectionInterpreter } from './intersections'

import { ordSetInterpreter } from './set'

import { ordStrMapInterpreter } from './str-map'

import { ordTaggedUnionInterpreter } from './tagged-unions'
import { ordNewtypeInterpreter } from './newtype'

export const allModelOrd = merge(
  ordNewtypeInterpreter,
  ordPrimitiveInterpreter,
  ordIntersectionInterpreter,
  ordSetInterpreter,
  ordStrMapInterpreter,
  ordTaggedUnionInterpreter
)

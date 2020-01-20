import { merge } from '../../common/utils'

import { fastCheckPrimitiveInterpreter } from './primitives'
import { fastCheckIntersectionInterpreter } from './intersections'
import { fastCheckObjectInterpreter } from './object'
import { fastCheckTaggedUnionInterpreter } from './tagged-unions'
import { fastCheckUnionInterpreter } from './unions'
import { fastCheckRecursiveInterpreter } from './recursive'
import { fastCheckStrMapInterpreter } from './str-map'
import { fastCheckSetInterpreter } from './set'

export const allModelFastCheck = merge(
  fastCheckPrimitiveInterpreter,
  fastCheckIntersectionInterpreter,
  fastCheckObjectInterpreter,
  fastCheckUnionInterpreter,
  fastCheckTaggedUnionInterpreter,
  fastCheckRecursiveInterpreter,
  fastCheckStrMapInterpreter,
  fastCheckSetInterpreter
)

import { merge } from '@sledorze/morphic-common/lib/utils'

import { fastCheckPrimitiveInterpreter } from './primitives'
import { fastCheckIntersectionInterpreter } from './intersections'
import { fastCheckObjectInterpreter } from './object'
import { fastCheckTaggedUnionInterpreter } from './tagged-unions'
import { fastCheckUnionInterpreter } from './unions'
import { fastCheckRecursiveInterpreter } from './recursive'
import { fastCheckStrMapInterpreter } from './str-map'
import { fastCheckSetInterpreter } from './set'
import { fastCheckUnknownInterpreter } from './unknown'
import { fastCheckNewtypeInterpreter } from './newtype'
import { fastCheckRefinedInterpreter } from './refined'

export const allModelFastCheck = merge(
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
  fastCheckSetInterpreter
)

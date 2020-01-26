import { merge } from '../../common/utils'
import { showPrimitiveInterpreter } from './primitives'
import { showIntersectionInterpreter } from './intersections'
import { showObjectInterpreter } from './object'
import { showTaggedUnionInterpreter } from './tagged-unions'
import { showRecursiveInterpreter } from './recursive'
import { showSetInterpreter } from './set'
import { showStrMapInterpreter } from './str-map'
import { showUnknownInterpreter } from './unknown'
import { showNewtypeInterpreter } from './newtype'
import { showRefinedInterpreter } from './refined'

export const allModelShow = merge(
  showRefinedInterpreter,
  showNewtypeInterpreter,
  showUnknownInterpreter,
  showPrimitiveInterpreter,
  showIntersectionInterpreter,
  showObjectInterpreter,
  showTaggedUnionInterpreter,
  showRecursiveInterpreter,
  showSetInterpreter,
  showStrMapInterpreter
)

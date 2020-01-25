import { merge } from '../../common/utils'
import { showPrimitiveInterpreter } from './primitives'
import { showIntersectionInterpreter } from './intersections'
import { showObjectInterpreter } from './object'
import { showTaggedUnionInterpreter } from './tagged-unions'
import { showRecursiveInterpreter } from './recursive'
import { showSetInterpreter } from './set'
import { showStrMapInterpreter } from './str-map'
import { showUnknownInterpreter } from './unknown'

export const allModelShow = merge(
  showUnknownInterpreter,
  showPrimitiveInterpreter,
  showIntersectionInterpreter,
  showObjectInterpreter,
  showTaggedUnionInterpreter,
  showRecursiveInterpreter,
  showSetInterpreter,
  showStrMapInterpreter
)

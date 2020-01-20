import { merge } from '../../../common/utils'

import { showPrimitiveInterpreter } from './primitives'

import { showIntersectionInterpreter } from './intersections'

import { showObjectInterpreter } from './object'

import { showTaggedUnionInterpreter } from './tagged-unions'

import { showRecursiveInterpreter } from './recursive'

import { showSetInterpreter } from './set'

import { showStrMapInterpreter } from './str-map'

export const allModelShow = merge(
  showPrimitiveInterpreter,
  showIntersectionInterpreter,
  showObjectInterpreter,
  showTaggedUnionInterpreter,
  showRecursiveInterpreter,
  showSetInterpreter,
  showStrMapInterpreter
)

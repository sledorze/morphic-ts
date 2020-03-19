import { merge } from '@morphic-ts/common/lib/utils'
import { eqRefinedInterpreter } from './model/refined'
import { eqNewtypeInterpreter } from './model/newtype'
import { eqUnknownInterpreter } from './model/unknown'
import { eqPrimitiveInterpreter } from './model/primitives'
import { eqIntersectionInterpreter } from './model/intersections'
import { eqObjectInterpreter } from './model/object'
import { eqTaggedUnionInterpreter } from './model/tagged-unions'
import { eqRecursiveInterpreter } from './model/recursive'
import { eqStrMapInterpreter } from './model/str-map'
import { eqSetInterpreter } from './model/set'
import { eqTermInterpreter } from './model/term'
export * from './hkt'

/**
 *  @since 0.0.1
 */
const allModelEq = merge(
  eqRefinedInterpreter,
  eqNewtypeInterpreter,
  eqUnknownInterpreter,
  eqPrimitiveInterpreter,
  eqIntersectionInterpreter,
  eqObjectInterpreter,
  eqTaggedUnionInterpreter,
  eqRecursiveInterpreter,
  eqStrMapInterpreter,
  eqSetInterpreter,
  eqTermInterpreter
)

/**
 *  @since 0.0.1
 */
export const modelEqInterpreter = allModelEq

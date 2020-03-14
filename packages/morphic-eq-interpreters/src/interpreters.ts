import { merge } from '@morphic-ts/common/lib/utils'
import { eqRefinedInterpreter } from './model-eq/refined'
import { eqNewtypeInterpreter } from './model-eq/newtype'
import { eqUnknownInterpreter } from './model-eq/unknown'
import { eqPrimitiveInterpreter } from './model-eq/primitives'
import { eqIntersectionInterpreter } from './model-eq/intersections'
import { eqObjectInterpreter } from './model-eq/object'
import { eqTaggedUnionInterpreter } from './model-eq/tagged-unions'
import { eqRecursiveInterpreter } from './model-eq/recursive'
import { eqStrMapInterpreter } from './model-eq/str-map'
import { eqSetInterpreter } from './model-eq/set'
import { eqTermInterpreter } from './model-eq/term'
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

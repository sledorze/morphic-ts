import { merge, memo } from '@morphic-ts/common/lib/utils'
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
import type { AnyEnv } from '@morphic-ts/common/lib/config'
export * from './hkt'

/**
 *  @since 0.0.1
 */
const allModelEq = <Env extends AnyEnv>() =>
  merge(
    eqRefinedInterpreter<Env>(),
    eqNewtypeInterpreter<Env>(),
    eqUnknownInterpreter<Env>(),
    eqPrimitiveInterpreter<Env>(),
    eqIntersectionInterpreter<Env>(),
    eqObjectInterpreter<Env>(),
    eqTaggedUnionInterpreter<Env>(),
    eqRecursiveInterpreter<Env>(),
    eqStrMapInterpreter<Env>(),
    eqSetInterpreter<Env>()
  )

/**
 *  @since 0.0.1
 */
export const modelEqInterpreter = memo(allModelEq) as typeof allModelEq

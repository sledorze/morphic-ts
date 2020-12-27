import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo, merge } from '@morphic-ts/common/lib/utils'

import { eqIntersectionInterpreter } from './model/intersections'
import { eqNewtypeInterpreter } from './model/newtype'
import { eqObjectInterpreter } from './model/object'
import { eqPrimitiveInterpreter } from './model/primitives'
import { eqRecursiveInterpreter } from './model/recursive'
import { eqRefinedInterpreter } from './model/refined'
import { eqSetInterpreter } from './model/set'
import { eqStrMapInterpreter } from './model/str-map'
import { eqTaggedUnionInterpreter } from './model/tagged-unions'
import { eqUnknownInterpreter } from './model/unknown'

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

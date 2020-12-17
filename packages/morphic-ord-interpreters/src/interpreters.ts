import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { merge } from '@morphic-ts/common/lib/utils'

import { ordIntersectionInterpreter } from './model/intersections'
import { ordNewtypeInterpreter } from './model/newtype'
import { ordPrimitiveInterpreter } from './model/primitives'
import { ordRefinedInterpreter } from './model/refined'
import { ordSetInterpreter } from './model/set'
import { ordStrMapInterpreter } from './model/str-map'
import { ordTaggedUnionInterpreter } from './model/tagged-unions'

export * from './hkt'

/**
 *  @since 0.0.1
 */
const allModelOrd = <Env extends AnyEnv>() =>
  merge(
    ordRefinedInterpreter<Env>(),
    ordNewtypeInterpreter<Env>(),
    ordPrimitiveInterpreter<Env>(),
    ordIntersectionInterpreter<Env>(),
    ordSetInterpreter<Env>(),
    ordStrMapInterpreter<Env>(),
    ordTaggedUnionInterpreter<Env>()
  )

/**
 *  @since 0.0.1
 */
export const modelOrdInterpreter = allModelOrd

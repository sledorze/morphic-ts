import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { merge } from '@morphic-ts/common/lib/utils'

import { ordIntersectionInterpreter } from './model/intersections'
import { ordNewtypeInterpreter } from './model/newtype'
import { ordPrimitiveInterpreter } from './model/primitives'
import { ordRefinedInterpreter } from './model/refined'
import { ordSetInterpreter } from './model/set'
import { ordStrMapInterpreter } from './model/str-map'
import { ordTaggedUnionInterpreter } from './model/tagged-unions'
import { ordUnionInterpreter } from './model/unions'

export {} from './model/unions'
export {} from './model/intersections'
export {} from './model/newtype'
export {} from './model/primitives'
export {} from './model/refined'
export {} from './model/set'
export {} from './model/str-map'
export {} from './model/tagged-unions'

export * from './hkt'

/**
 *  @since 0.0.1
 */
const allModelOrd = <Env extends AnyEnv>() =>
  merge(
    ordUnionInterpreter<Env>(),
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

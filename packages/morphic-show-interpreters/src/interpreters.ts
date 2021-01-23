import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { merge } from '@morphic-ts/common/lib/utils'

import { showIntersectionInterpreter } from './model/intersections'
import { showNewtypeInterpreter } from './model/newtype'
import { showObjectInterpreter } from './model/object'
import { showPrimitiveInterpreter } from './model/primitives'
import { showRecursiveInterpreter } from './model/recursive'
import { showRefinedInterpreter } from './model/refined'
import { showSetInterpreter } from './model/set'
import { showStrMapInterpreter } from './model/str-map'
import { showTaggedUnionInterpreter } from './model/tagged-unions'
import { showUnionInterpreter } from './model/unions'
import { showUnknownInterpreter } from './model/unknown'

export {} from './model/unions'
export {} from './model/intersections'
export {} from './model/newtype'
export {} from './model/object'
export {} from './model/primitives'
export {} from './model/recursive'
export {} from './model/refined'
export {} from './model/set'
export {} from './model/str-map'
export {} from './model/tagged-unions'
export {} from './model/unknown'

export * from './hkt'

/**
 *  @since 0.0.1
 */
const allModelShow = <Env extends AnyEnv>() =>
  merge(
    showUnionInterpreter<Env>(),
    showRefinedInterpreter<Env>(),
    showNewtypeInterpreter<Env>(),
    showUnknownInterpreter<Env>(),
    showPrimitiveInterpreter<Env>(),
    showIntersectionInterpreter<Env>(),
    showObjectInterpreter<Env>(),
    showTaggedUnionInterpreter<Env>(),
    showRecursiveInterpreter<Env>(),
    showSetInterpreter<Env>(),
    showStrMapInterpreter<Env>()
  )

/**
 *  @since 0.0.1
 */
export const modelShowInterpreter = allModelShow

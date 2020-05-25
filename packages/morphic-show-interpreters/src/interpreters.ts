import { merge } from '@morphic-ts/common/lib/utils'
import { showRefinedInterpreter } from './model/refined'
import { showNewtypeInterpreter } from './model/newtype'
import { showUnknownInterpreter } from './model/unknown'
import { showPrimitiveInterpreter } from './model/primitives'
import { showIntersectionInterpreter } from './model/intersections'
import { showObjectInterpreter } from './model/object'
import { showTaggedUnionInterpreter } from './model/tagged-unions'
import { showRecursiveInterpreter } from './model/recursive'
import { showSetInterpreter } from './model/set'
import { showStrMapInterpreter } from './model/str-map'
import type { AnyEnv } from '@morphic-ts/common/lib/config'

export * from './hkt'

/**
 *  @since 0.0.1
 */
const allModelShow = <Env extends AnyEnv>() =>
  merge(
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

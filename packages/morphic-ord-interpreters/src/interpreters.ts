import { merge } from '@morphic-ts/common/lib/utils'

import { ordRefinedInterpreter } from './model/refined'

import { ordNewtypeInterpreter } from './model/newtype'

import { ordPrimitiveInterpreter } from './model/primitives'

import { ordIntersectionInterpreter } from './model/intersections'

import { ordSetInterpreter } from './model/set'

import { ordStrMapInterpreter } from './model/str-map'

import { ordTaggedUnionInterpreter } from './model/tagged-unions'

export * from './hkt'

/**
 *  @since 0.0.1
 */
const allModelOrd = merge(
  ordRefinedInterpreter,
  ordNewtypeInterpreter,
  ordPrimitiveInterpreter,
  ordIntersectionInterpreter,
  ordSetInterpreter,
  ordStrMapInterpreter,
  ordTaggedUnionInterpreter
)

/**
 *  @since 0.0.1
 */
export const modelOrdInterpreter = allModelOrd

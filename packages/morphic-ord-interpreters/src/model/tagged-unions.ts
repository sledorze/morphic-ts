import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { mapRecord, memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraTaggedUnions1 } from '@morphic-ts/model-algebras/lib/tagged-unions'
import { ordString } from 'fp-ts/Ord'
import type { Ordering } from 'fp-ts/Ordering'

import { ordApplyConfig } from '../config'
import { OrdType, OrdURI } from '../hkt'

/**
 * This is kind of useless as required interfaces are not supported in Ord
 */

/**
 *  @since 0.0.1
 */
export const ordTaggedUnionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraTaggedUnions1<OrdURI, Env> => ({
    _F: OrdURI,
    taggedUnion: (tag, types, _name, config) => env => {
      const equals = mapRecord(types, a => a(env).ord.equals)
      const compares = mapRecord(types, a => a(env).ord.compare)
      return new OrdType(
        ordApplyConfig(config)(
          {
            compare: (a, b): Ordering => {
              const aTag = a[tag]
              const bTag = b[tag]
              return aTag === bTag ? (compares as any)[aTag](a, b) : ordString.compare(String(aTag), String(bTag))
            },
            equals: (a, b): boolean => {
              const aTag = a[tag]
              return aTag === b[tag] ? (equals as any)[aTag](a, b) : false
            }
          },
          env
        )
      )
    }
  })
)

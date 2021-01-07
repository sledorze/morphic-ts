import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { mapRecord, memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraTaggedUnions } from '@morphic-ts/model-algebras/lib/tagged-unions'

import { eqApplyConfig } from '../config'
import { EqType, EqURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const eqTaggedUnionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraTaggedUnions<EqURI, Env> => ({
    _F: EqURI,
    taggedUnion: (tag, types, _name, config) => env => {
      // TODO: add customize
      const equals = mapRecord(types, a => (a as any)(env).eq.equals)
      return new EqType(
        eqApplyConfig(config)(
          {
            equals: (a, b): boolean => {
              if (a === b) {
                return true
              } else {
                const aTag = (a as any)[tag]
                return aTag === (b as any)[tag] ? (equals as any)[aTag](a, b) : false
              }
            }
          },
          env,
          {}
        )
      )
    }
  })
)

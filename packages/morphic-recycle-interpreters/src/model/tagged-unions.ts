import { ModelAlgebraTaggedUnions1 } from '@morphic-ts/model-algebras/lib/tagged-unions'
import { RecycleType, RecycleURI } from '../hkt'
import { mapRecord, memo } from '@morphic-ts/common/lib/utils'
import { AnyEnv } from '@morphic-ts/common/lib/config'

/**
 *  @since 0.0.1
 */
export const recycleTaggedUnionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraTaggedUnions1<RecycleURI, Env> => ({
    _F: RecycleURI,
    taggedUnion: (tag, types, _name, _config) => env => {
      // TODO: add customize
      const recycle = mapRecord(types, a => a(env).recycle.recycle)
      return new RecycleType({
        recycle: (prev, next) => {
          if (prev === next) {
            return next
          } else {
            const aTag = prev[tag]
            return aTag === next[tag] ? recycle[aTag](prev, next) : next
          }
        }
      })
    }
  })
)

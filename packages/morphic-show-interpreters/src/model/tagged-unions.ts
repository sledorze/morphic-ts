import { ModelAlgebraTaggedUnions1 } from '@morphic-ts/model-algebras/lib/tagged-unions'
import { ShowType, ShowURI } from '../hkt'
import { mapRecord } from '@morphic-ts/common/lib/utils'
import { showApplyConfig } from '../config'
import { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const showTaggedUnionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraTaggedUnions1<ShowURI, Env> => ({
    _F: ShowURI,
    taggedUnion: (tag, types) => env => {
      const shows = mapRecord(types, a => a(env).show.show)
      return new ShowType({
        show: (a): string => (shows as any)[a[tag]](a)
      })
    },
    taggedUnionCfg: (tag, types) => config => env => {
      const shows = mapRecord(types, a => a(env).show.show)
      return new ShowType(
        showApplyConfig(config)(
          {
            show: (a): string => (shows as any)[a[tag]](a)
          },
          env
        )
      )
    }
  })
)

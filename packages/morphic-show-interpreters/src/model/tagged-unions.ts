import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { mapRecord, memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraTaggedUnions1 } from '@morphic-ts/model-algebras/lib/tagged-unions'

import { showApplyConfig } from '../config'
import { ShowType, ShowURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const showTaggedUnionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraTaggedUnions1<ShowURI, Env> => ({
    _F: ShowURI,
    taggedUnion: (tag, types, _name, config) => env => {
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

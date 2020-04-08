import { ModelAlgebraTaggedUnions1 } from '@morphic-ts/model-algebras/lib/tagged-unions'
import { EqType, EqURI } from '../hkt'
import { mapRecord } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const eqTaggedUnionInterpreter: ModelAlgebraTaggedUnions1<EqURI> = {
  _F: EqURI,
  taggedUnion: (tag, types) => _config => env => {
    // TODO: add customize
    const equals = mapRecord(types, a => a(env).eq.equals)
    return new EqType({
      equals: (a, b): boolean => {
        if (a === b) {
          return true
        } else {
          const aTag = a[tag]
          return aTag === b[tag] ? equals[aTag](a, b) : false
        }
      }
    })
  }
}

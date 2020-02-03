import { ModelAlgebraTaggedUnions1 } from '@sledorze/morphic-model-algebras/lib/tagged-unions'
import { EqType, EqURI } from '..'
import { mapRecord } from '@sledorze/morphic-common/lib/utils'

export const eqTaggedUnionInterpreter: ModelAlgebraTaggedUnions1<EqURI> = {
  _F: EqURI,
  taggedUnion: (tag, types) => {
    const equals = mapRecord(types, a => a.eq.equals)
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

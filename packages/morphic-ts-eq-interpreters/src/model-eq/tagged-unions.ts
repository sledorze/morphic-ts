import { ModelAlgebraTaggedUnions1 } from '@sledorze/morphic-ts-model-algebras/lib/tagged-unions'
import { EqType, EqURI } from '..'
import { mapRecord } from '@sledorze/morphic-ts-common/lib/utils'

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

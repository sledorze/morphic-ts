import { ordString } from 'fp-ts/lib/Ord'
import { OrdType, OrdURI } from '..'
import { ModelAlgebraTaggedUnions1 } from 'morphic-model-algebras/lib/tagged-unions'
import { mapRecord } from 'morphic-common/lib/utils'
import { Ordering } from 'fp-ts/lib/Ordering'

/**
 * This is kind of useless as required interfaces are not supported in Ord
 */

/**
 *  @since 0.0.1
 */
export const ordTaggedUnionInterpreter: ModelAlgebraTaggedUnions1<OrdURI> = {
  _F: OrdURI,
  taggedUnion: (tag, types) => {
    const equals = mapRecord(types, a => a.ord.equals)
    const compares = mapRecord(types, a => a.ord.compare)
    return new OrdType({
      compare: (a, b): Ordering => {
        const aTag = a[tag]
        const bTag = b[tag]
        return aTag === bTag ? (compares as any)[aTag](a, b) : ordString.compare(String(aTag), String(bTag))
      },
      equals: (a, b): boolean => {
        const aTag = a[tag]
        return aTag === b[tag] ? (equals as any)[aTag](a, b) : false
      }
    })
  }
}

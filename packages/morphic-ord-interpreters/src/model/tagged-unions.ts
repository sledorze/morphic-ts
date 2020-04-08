import { ordString } from 'fp-ts/lib/Ord'
import { OrdType, OrdURI } from '../hkt'
import { ModelAlgebraTaggedUnions1 } from '@morphic-ts/model-algebras/lib/tagged-unions'
import { mapRecord } from '@morphic-ts/common/lib/utils'
import { Ordering } from 'fp-ts/lib/Ordering'

/**
 * This is kind of useless as required interfaces are not supported in Ord
 */

/**
 *  @since 0.0.1
 */
export const ordTaggedUnionInterpreter: ModelAlgebraTaggedUnions1<OrdURI> = {
  _F: OrdURI,
  // TODO: add customize
  taggedUnion: (tag, types) => _config => env => {
    const equals = mapRecord(types, a => a(env).ord.equals)
    const compares = mapRecord(types, a => a(env).ord.compare)
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

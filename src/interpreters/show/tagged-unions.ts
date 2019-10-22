import { ModelAlgebraTaggedUnions1 } from '../../algebras/tagged-unions'
import { ShowType, URI } from '.'
import { mapRecord } from '../../utils'

export const showTaggedUnionInterpreter: ModelAlgebraTaggedUnions1<URI> = {
  taggedUnion: (tag, types) => {
    const shows = mapRecord(types, a => a.show.show)
    return new ShowType({
      show: (a): string => (shows as any)[a[tag]](a)
    })
  }
}

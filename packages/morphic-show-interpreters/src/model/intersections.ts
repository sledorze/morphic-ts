import { ModelAlgebraIntersection1 } from '@sledorze/morphic-model-algebras/lib/intersections'
import { ShowType, ShowURI } from '..'

/**
 *  @since 0.0.1
 */
export const showIntersectionInterpreter: ModelAlgebraIntersection1<ShowURI> = {
  _F: ShowURI,
  intersection: <A>(types: Array<ShowType<A>>) => {
    const shows = types.map(({ show }) => show.show)
    return new ShowType<A>({
      show: (a: A) => shows.map(s => s(a)).join(' & ')
    })
  }
}

import { ModelAlgebraIntersection1 } from '../../model-algebras/intersections'
import { ShowType, ShowURI } from '..'

export const showIntersectionInterpreter: ModelAlgebraIntersection1<ShowURI> = {
  intersection: <A>(types: Array<ShowType<A>>) => {
    const shows = types.map(({ show }) => show.show)
    return new ShowType<A>({
      show: (a: A) => shows.map(s => s(a)).join(' & ')
    })
  }
}

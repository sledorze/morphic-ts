import { ModelAlgebraIntersection1 } from '@morphic-ts/model-algebras/lib/intersections'
import { ShowType, ShowURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const showIntersectionInterpreter: ModelAlgebraIntersection1<ShowURI> = {
  _F: ShowURI,
  intersection: <A, R>(types: Array<(_: R) => ShowType<A>>) => (env: R) => {
    const shows = types.map(getShow => getShow(env).show.show)
    return new ShowType<A>({
      show: (a: A) => shows.map(s => s(a)).join(' & ')
    })
  }
}

import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { AnyNewtype, ModelAlgebraNewtype, NewtypeA } from '@morphic-ts/model-algebras/lib/newtype'
import type { Show } from 'fp-ts/lib/Show'

import { showApplyConfig } from '../config'
import { ShowType, ShowURI } from '../hkt'

const coerce = <N extends AnyNewtype>(e: Show<NewtypeA<N>>): Show<N> => e as Show<N>

/**
 *  @since 0.0.1
 */
export const showNewtypeInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraNewtype<ShowURI, Env> => ({
    _F: ShowURI,
    newtype: name => (a, config) => env =>
      new ShowType(showApplyConfig(config)(coerce({ show: x => `<${name}>(${a(env).show.show(x)})` }), env))
  })
)

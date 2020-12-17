import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraRefined2 } from '@morphic-ts/model-algebras/lib/refined'
import { failure, success, Type } from 'io-ts'

import { iotsApplyConfig } from '../config'
import { IOTSType, IoTsURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const refinement = <A, O, B extends A>(T: Type<A, O>, ref: (a: A) => a is B, name: string): Type<B, O> =>
  new Type<B, O>(
    name,
    (x): x is B => T.is(x) && ref(x),
    (i, c) => {
      const r = T.decode(i)
      if (r._tag === 'Left') {
        return r
      }
      const v = r.right
      return ref(v) ? success(v) : failure(i, c)
    },
    T.encode
  )

/**
 *  @since 0.0.1
 */
export const ioTsRefinedInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraRefined2<IoTsURI, Env> => ({
    _F: IoTsURI,
    refined: (a, ref, name, config) => env =>
      new IOTSType(iotsApplyConfig(config)(refinement(a(env).type, ref, name), env))
  })
)

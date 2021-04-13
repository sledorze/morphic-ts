import type { AnyEnv } from '@morphic-ts/common/lib/config'
import type { HKT } from '@morphic-ts/common/lib/HKT'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraUnions } from '@morphic-ts/model-algebras/lib/unions'
import type { Arbitrary } from 'fast-check'
import { oneof } from 'fast-check'
import { pipe } from 'fp-ts/lib/pipeable'

import { fastCheckApplyConfig } from '../config'
import { FastCheckType, FastCheckURI } from '../hkt'

declare module '@morphic-ts/model-algebras/lib/unions' {
  /**
   * @since 0.0.1
   */

  interface UnionConfig<Types> {
    [FastCheckURI]: {
      arbs: {
        [k in keyof Types]: Types[k] extends HKT<any, infer E, infer A> ? Arbitrary<A> : never
      }
    }
  }
}

/**
 *  @since 0.0.1
 */
export const fastCheckUnionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraUnions<FastCheckURI, Env> => ({
    _F: FastCheckURI,
    union: (...items) => (_guards, config) => env =>
      new FastCheckType(
        pipe(
          items.map(getArb => getArb(env).arb),
          arbs => fastCheckApplyConfig(config?.conf)(oneof(...arbs) as any, env, { arbs } as any)
        )
      )
  })
)

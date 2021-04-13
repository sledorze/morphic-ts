import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type {
  AnyNewtype,
  AOfIso,
  AOfPrism,
  ModelAlgebraNewtype,
  NewtypeA
} from '@morphic-ts/model-algebras/lib/newtype'
import { either as E } from 'fp-ts'
import { pipe } from 'fp-ts/lib/function'
import type { Is } from 'io-ts'
import { failure, success, Type } from 'io-ts'

import { iotsApplyConfig } from '../config'
import { IOTSType, IoTsURI } from '../hkt'

declare module '@morphic-ts/model-algebras/lib/newtype' {
  export interface NewtypeConfig<L, A, N> {
    [IoTsURI]: {
      type: Type<A, L>
    }
  }
  export interface IsoConfig<L, A, N> {
    [IoTsURI]: {
      type: Type<A, L>
    }
  }
  export interface PrismConfig<L, A, N> {
    [IoTsURI]: {
      type: Type<A, L>
    }
  }
}

const coerce = <N extends AnyNewtype, O, I>(e: Type<NewtypeA<N>, O, I>): Type<N, O, I> => (e as any) as Type<N, O, I>

/**
 *  @since 0.0.1
 */
export const ioTsNewtypeInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraNewtype<IoTsURI, Env> => ({
    _F: IoTsURI,
    newtype: () => (a, config) => env =>
      pipe(a(env).type, type => new IOTSType(iotsApplyConfig(config?.conf)(coerce(type), env, { type }))),
    newtypeIso: (iso, a, config) => env =>
      pipe(a(env).type, type => {
        type N = AOfIso<typeof iso>
        const is: Is<N> = (v): v is N => type.is(v)
        return new IOTSType(
          iotsApplyConfig(config?.conf)(
            new Type(
              config?.name || `NewtypeIso(${type.name})`,
              is,
              (i, c) => pipe(type.validate(i, c), E.map(iso.get)),
              v => type.encode(iso.reverseGet(v))
            ),
            env,
            { type }
          )
        )
      }),
    newtypePrism: (prism, a, config) => env =>
      pipe(a(env).type, type => {
        type N = AOfPrism<typeof prism>
        const is: Is<N> = (v): v is N => type.is(v)
        return new IOTSType(
          iotsApplyConfig(config?.conf)(
            new Type(
              config?.name || `NewtypePrism(${type.name})`,
              is,
              (i, c) =>
                pipe(
                  type.validate(i, c),
                  E.chain(v => {
                    const x = prism.getOption(v)
                    return x._tag === 'None'
                      ? failure(i, c, `newtype doesn't satisfy prism conditions`)
                      : success(x.value)
                  })
                ),
              v => type.encode(prism.reverseGet(v))
            ),
            env,
            { type }
          )
        )
      })
  })
)

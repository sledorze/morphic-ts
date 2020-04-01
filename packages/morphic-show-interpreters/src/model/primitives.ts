import { showNumber, showString, Show, showBoolean } from 'fp-ts/lib/Show'
import { getShow as optionGetShow, Option } from 'fp-ts/lib/Option'
import { getShow as getShowA } from 'fp-ts/lib/Array'
import { ModelAlgebraPrimitive1 } from '@morphic-ts/model-algebras/lib/primitives'
import { ShowType, ShowURI } from '../hkt'
import { Customize, applyCustomize } from './common'

declare module '@morphic-ts/algebras/lib/hkt' {
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveDateConfig<RC> {
    [ShowURI]: Customize<Date> | undefined
  }
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveStringConfig<RC> {
    [ShowURI]: Customize<string> | undefined
  }
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveNumberConfig<RC> {
    [ShowURI]: Customize<number> | undefined
  }
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveBigIntConfig<RC> {
    [ShowURI]: Customize<bigint> | undefined
  }
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveBooleanConfig<RC> {
    [ShowURI]: Customize<boolean> | undefined
  }
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveArrayConfig<RC, E, A> {
    [ShowURI]: Customize<A[]> | undefined
  }
  /**
   *  @since 0.0.2
   */
  export interface PrimitiveKeysOfConfig<RC, K> {
    [ShowURI]: Customize<K> | undefined
  }
  /**
   *  @since 0.0.2
   */
  export interface PrimitiveStringLiteralConfig<RC, K> {
    [ShowURI]: Customize<K> | undefined
  }
  /**
   *  @since 0.0.2
   */
  export interface PrimitiveNullableConfig<RC, E, A> {
    [ShowURI]: Customize<Option<A>> | undefined
  }
}

/**
 *  @since 0.0.1
 */
export const showPrimitiveInterpreter: ModelAlgebraPrimitive1<ShowURI> = {
  _F: ShowURI,
  date: config => _env => new ShowType(applyCustomize(config)({ show: (date: Date) => date.toISOString() })),
  boolean: config => _env => new ShowType(applyCustomize(config)(showBoolean)),
  string: config => _env => new ShowType(applyCustomize(config)(showString)),
  number: config => _env => new ShowType(applyCustomize(config)(showNumber)),
  bigint: config => _env => new ShowType(applyCustomize(config)({ show: a => JSON.stringify(a) })),
  stringLiteral: (_, config) => _env => new ShowType(applyCustomize(config)(showString)),
  keysOf: (_keys, config) => _env => new ShowType(applyCustomize(config)(showString as Show<any>)),
  nullable: (getShow, config) => env => new ShowType(applyCustomize(config)(optionGetShow(getShow(env).show))),
  array: (getShow, config) => env => new ShowType(applyCustomize(config)(getShowA(getShow(env).show)))
}

import { showNumber, showString, Show, showBoolean } from 'fp-ts/lib/Show'
import { getShow, Option } from 'fp-ts/lib/Option'
import { getShow as getShowA } from 'fp-ts/lib/Array'
import { ModelAlgebraPrimitive1 } from '@morphic-ts/model-algebras/lib/primitives'
import { ShowType, ShowURI } from '../hkt'
import { Customize, applyCustomize } from './common'

declare module '@morphic-ts/algebras/lib/hkt' {
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveDateConfig {
    [ShowURI]: Customize<Date> | undefined
  }
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveStringConfig {
    [ShowURI]: Customize<string> | undefined
  }
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveNumberConfig {
    [ShowURI]: Customize<number> | undefined
  }
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveBigIntConfig {
    [ShowURI]: Customize<bigint> | undefined
  }
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveBooleanConfig {
    [ShowURI]: Customize<boolean> | undefined
  }
  /**
   *  @since 0.0.1
   */
  export interface PrimitiveArrayConfig<A> {
    [ShowURI]: Customize<A[]> | undefined
  }
  /**
   *  @since 0.0.2
   */
  export interface PrimitiveKeysOfConfig<K> {
    [ShowURI]: Customize<K> | undefined
  }
  /**
   *  @since 0.0.2
   */
  export interface PrimitiveStringLiteralConfig<K> {
    [ShowURI]: Customize<K> | undefined
  }
  /**
   *  @since 0.0.2
   */
  export interface PrimitiveNullableConfig<A> {
    [ShowURI]: Customize<Option<A>> | undefined
  }
}

/**
 *  @since 0.0.1
 */
export const showPrimitiveInterpreter: ModelAlgebraPrimitive1<ShowURI> = {
  _F: ShowURI,
  date: config => new ShowType(applyCustomize(config)({ show: (date: Date) => date.toISOString() })),
  boolean: config => new ShowType(applyCustomize(config)(showBoolean)),
  string: config => new ShowType(applyCustomize(config)(showString)),
  number: config => new ShowType(applyCustomize(config)(showNumber)),
  bigint: config => new ShowType(applyCustomize(config)({ show: a => JSON.stringify(a) })),
  stringLiteral: (_, config) => new ShowType(applyCustomize(config)(showString)),
  keysOf: (_keys, config) => new ShowType(applyCustomize(config)(showString as Show<any>)),
  nullable: ({ show }, config) => new ShowType(applyCustomize(config)(getShow(show))),
  array: ({ show }, config) => new ShowType(applyCustomize(config)(getShowA(show)))
}

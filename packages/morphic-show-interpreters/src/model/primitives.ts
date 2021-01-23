import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraPrimitive } from '@morphic-ts/model-algebras/lib/primitives'
import { getShow as EgetShow } from 'fp-ts/Either'
import { pipe } from 'fp-ts/lib/function'
import { getShow as OgetShow } from 'fp-ts/Option'
import { getShow as AgetShow } from 'fp-ts/ReadonlyArray'
import { getShow as NEAgetShow } from 'fp-ts/ReadonlyNonEmptyArray'
import type { Show } from 'fp-ts/Show'
import { showBoolean, showNumber, showString } from 'fp-ts/Show'

import { showApplyConfig } from '../config'
import { ShowType, ShowURI } from '../hkt'

declare module '@morphic-ts/model-algebras/lib/primitives' {
  /**
   * @since 0.0.1
   */

  interface NonEmptyArrayConfig<L, A> {
    [ShowURI]: {
      show: Show<A>
    }
  }
  /**
   * @since 0.0.1
   */
  interface ArrayConfig<L, A> {
    [ShowURI]: {
      show: Show<A>
    }
  }
  /**
   * @since 0.0.1
   */
  interface NullableConfig<L, A> {
    [ShowURI]: {
      show: Show<A>
    }
  }
  /**
   * @since 0.0.1
   */
  interface MutableConfig<L, A> {
    [ShowURI]: {
      show: Show<A>
    }
  }
  /**
   * @since 0.0.1
   */
  interface OptionalConfig<L, A> {
    [ShowURI]: {
      show: Show<A>
    }
  }
  /**
   * @since 0.0.1
   */
  interface EitherConfig<EE, EA, AE, AA> {
    [ShowURI]: {
      left: Show<EA>
      right: Show<AA>
    }
  }
  /**
   * @since 0.0.1
   */
  interface OptionConfig<L, A> {
    [ShowURI]: {
      show: Show<A>
    }
  }
}

const showStringOrNumber: Show<string | number> = {
  show: a => `${a}`
}

const showUndefinedOf = <A>(s: Show<A>): Show<A | undefined> => ({
  show: a => (a === undefined ? '<undefined>' : s.show(a))
})

/**
 *  @since 0.0.1
 */
export const showPrimitiveInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraPrimitive<ShowURI, Env> => ({
    _F: ShowURI,
    date: config => env => new ShowType(showApplyConfig(config)({ show: (date: Date) => date.toISOString() }, env, {})),
    boolean: config => env => new ShowType(showApplyConfig(config)(showBoolean, env, {})),
    string: config => env => new ShowType(showApplyConfig(config)(showString, env, {})),
    number: config => env => new ShowType(showApplyConfig(config)(showNumber, env, {})),
    bigint: config => env => new ShowType(showApplyConfig(config)({ show: a => JSON.stringify(a) }, env, {})),
    stringLiteral: (_, config) => env => new ShowType(showApplyConfig(config)(showString, env, {})),
    numberLiteral: (_, config) => env => new ShowType(showApplyConfig(config)(showNumber, env, {})),
    oneOfLiterals: (_, config) => env => new ShowType(showApplyConfig(config)(showStringOrNumber, env, {})),
    tag: (_, config) => env => new ShowType(showApplyConfig(config)(showString, env, {})),
    keysOf: (_keys, config) => env => new ShowType(showApplyConfig(config)(showString as Show<any>, env, {})),
    nullable: (getShow, config) => env =>
      pipe(getShow(env).show, show => new ShowType(showApplyConfig(config)(OgetShow(show), env, { show }))),
    optional: (getShow, config) => env =>
      pipe(getShow(env).show, show => new ShowType(showApplyConfig(config)(showUndefinedOf(show), env, { show }))),
    mutable: (getShow, config) => env =>
      pipe(getShow(env).show, show => new ShowType(showApplyConfig(config)(show, env, { show }))),
    array: (getShow, config) => env =>
      pipe(getShow(env).show, show => new ShowType(showApplyConfig(config)(AgetShow(show), env, { show }))),
    nonEmptyArray: (getShow, config) => env =>
      pipe(getShow(env).show, show => new ShowType(showApplyConfig(config)(NEAgetShow(show), env, { show }))),
    uuid: config => env => new ShowType(showApplyConfig(config)(showString, env, {})),
    either: (e, a, config) => env =>
      ((left, right) => new ShowType(showApplyConfig(config)(EgetShow(left, right), env, { left, right })))(
        e(env).show,
        a(env).show
      ),
    option: (getShow, config) => env =>
      pipe(getShow(env).show, show => new ShowType(showApplyConfig(config)(OgetShow(show), env, { show }))),
    unknownE: (getShow, config) => env =>
      pipe(getShow(env).show, show => new ShowType(showApplyConfig(config)(show, env, { show })))
  })
)

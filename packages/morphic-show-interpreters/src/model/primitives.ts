import type { Show } from 'fp-ts/Show'
import { showNumber, showString, showBoolean } from 'fp-ts/Show'
import { getShow as OgetShow } from 'fp-ts/Option'
import { getShow as AgetShow } from 'fp-ts/Array'
import { getShow as NEAgetShow } from 'fp-ts/NonEmptyArray'
import { getShow as EgetShow } from 'fp-ts/Either'
import type { ModelAlgebraPrimitive1 } from '@morphic-ts/model-algebras/lib/primitives'
import { ShowType, ShowURI } from '../hkt'
import { showApplyConfig } from '../config'
import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const showPrimitiveInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraPrimitive1<ShowURI, Env> => ({
    _F: ShowURI,
    date: config => env => new ShowType(showApplyConfig(config)({ show: (date: Date) => date.toISOString() }, env)),
    boolean: config => env => new ShowType(showApplyConfig(config)(showBoolean, env)),
    string: config => env => new ShowType(showApplyConfig(config)(showString, env)),
    number: config => env => new ShowType(showApplyConfig(config)(showNumber, env)),
    bigint: config => env => new ShowType(showApplyConfig(config)({ show: a => JSON.stringify(a) }, env)),
    stringLiteral: (_, config) => env => new ShowType(showApplyConfig(config)(showString, env)),
    keysOf: (_keys, config) => env => new ShowType(showApplyConfig(config)(showString as Show<any>, env)),
    nullable: (getShow, config) => env => new ShowType(showApplyConfig(config)(OgetShow(getShow(env).show), env)),
    array: (getShow, config) => env => new ShowType(showApplyConfig(config)(AgetShow(getShow(env).show), env)),
    nonEmptyArray: (getShow, config) => env =>
      new ShowType(showApplyConfig(config)(NEAgetShow(getShow(env).show), env)),
    uuid: config => env => new ShowType(showApplyConfig(config)(showString, env)),
    either: (e, a, config) => env => new ShowType(showApplyConfig(config)(EgetShow(e(env).show, a(env).show), env)),
    option: (a, config) => env => new ShowType(showApplyConfig(config)(OgetShow(a(env).show), env))
  })
)

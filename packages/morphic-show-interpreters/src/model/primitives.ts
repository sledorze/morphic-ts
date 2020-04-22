import { showNumber, showString, Show, showBoolean } from 'fp-ts/lib/Show'
import { getShow as optionGetShow } from 'fp-ts/lib/Option'
import { getShow as getShowA } from 'fp-ts/lib/Array'
import { ModelAlgebraPrimitive1 } from '@morphic-ts/model-algebras/lib/primitives'
import { ShowType, ShowURI } from '../hkt'
import { showApplyConfig } from '../config'
import { AnyEnv } from '@morphic-ts/common/lib/config'
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
    nullable: (getShow, config) => env => new ShowType(showApplyConfig(config)(optionGetShow(getShow(env).show), env)),
    array: (getShow, config) => env => new ShowType(showApplyConfig(config)(getShowA(getShow(env).show), env))
  })
)

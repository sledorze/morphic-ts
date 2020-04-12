import { showNumber, showString, Show, showBoolean } from 'fp-ts/lib/Show'
import { getShow as optionGetShow, Option } from 'fp-ts/lib/Option'
import { getShow as getShowA } from 'fp-ts/lib/Array'
import { ModelAlgebraPrimitive1 } from '@morphic-ts/model-algebras/lib/primitives'
import { ShowType, ShowURI } from '../hkt'
import { applyCustomize } from './common'

/**
 *  @since 0.0.1
 */
export const showPrimitiveInterpreter: ModelAlgebraPrimitive1<ShowURI> = {
  _F: ShowURI,
  date: () => _env => new ShowType({ show: (date: Date) => date.toISOString() }),
  dateCfg: config => env => new ShowType(applyCustomize(config)({ show: (date: Date) => date.toISOString() }, env)),
  boolean: () => _env => new ShowType(showBoolean),
  booleanCfg: config => env => new ShowType(applyCustomize(config)(showBoolean, env)),
  string: () => _env => new ShowType(showString),
  stringCfg: config => env => new ShowType(applyCustomize(config)(showString, env)),
  number: () => _env => new ShowType(showNumber),
  numberCfg: config => env => new ShowType(applyCustomize(config)(showNumber, env)),
  bigint: () => _env => new ShowType({ show: a => JSON.stringify(a) }),
  bigintCfg: config => env => new ShowType(applyCustomize(config)({ show: a => JSON.stringify(a) }, env)),
  stringLiteral: _ => _env => new ShowType<typeof _>(showString),
  stringLiteralCfg: (_, config) => env => new ShowType(applyCustomize(config)(showString, env)),
  keysOf: _keys => _env => new ShowType(showString as Show<any>),
  keysOfCfg: (_keys, config) => env => new ShowType(applyCustomize(config)(showString as Show<any>, env)),
  nullable: getShow => env => new ShowType(optionGetShow(getShow(env).show)),
  nullableCfg: getShow => config => env => new ShowType(applyCustomize(config)(optionGetShow(getShow(env).show), env)),
  array: getShow => env => new ShowType(getShowA(getShow(env).show)),
  arrayCfg: getShow => config => env => new ShowType(applyCustomize(config)(getShowA(getShow(env).show), env))
}

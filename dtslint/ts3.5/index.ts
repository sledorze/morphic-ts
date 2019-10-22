import { Kind } from '../HKT'
import * as common from '../../src/core'
import * as eq from '../../src/interpreters/eq'
export { eq }
export type Dic = common.AnyTypeDic<'Eq'>

export interface Props {
  a: Kind<'EqType', number>
  b: Kind<'EqType', string>
}

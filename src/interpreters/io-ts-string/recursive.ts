import * as t from 'io-ts'
import { IOTSStringType, URI } from '.'
import { ModelAlgebraRecursive2 } from '../../algebras/recursive'

export const ioTsStringRecursiveInterpreter: ModelAlgebraRecursive2<URI> = {
  recursive: lazyA => {
    const res: ReturnType<typeof lazyA>['type'] = t.recursion(`recursive`, () => lazyA().type)
    return new IOTSStringType(res)
  }
}

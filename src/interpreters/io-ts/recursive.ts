import * as t from 'io-ts'
import { IOTSType, URI } from '.'
import { ModelAlgebraRecursive1 } from '../../algebras/recursive'

export const ioTsRecursiveInterpreter: ModelAlgebraRecursive1<URI> = {
  recursive: lazyA => {
    const res: t.Type<t.TypeOf<ReturnType<typeof lazyA>['type']>, unknown> = t.recursion(
      `recursive`,
      () => lazyA().type
    )
    return new IOTSType(res)
  }
}

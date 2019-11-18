import * as chai from 'chai'
import { ordInterpreter } from '../../../src/interpreters/ord/interpreters'
import { URIS, Kind } from '../../../src/HKT'
import { ModelAlgebraPrimitive1 } from '../../../src/algebras/primitives'
import { ModelAlgebraIntersection1 } from '../../../src/algebras/intersections'
import { ModelAlgebraTaggedUnions1 } from '../../../src/algebras/tagged-unions'
import { InterpreterFor, cacheUnaryFunction } from '../../../src/core'
import { lt, gt, ordNumber, ord } from 'fp-ts/lib/Ord'
import { ModelAlgebraStrMap1 } from '../../../src/algebras/str-map'
import { ModelAlgebraSet1 } from '../../../src/algebras/set'

export interface ModelAlgebra<F extends URIS>
  extends ModelAlgebraPrimitive1<F>,
    ModelAlgebraIntersection1<F>,
    ModelAlgebraStrMap1<F>,
    ModelAlgebraSet1<F>,
    ModelAlgebraTaggedUnions1<F>,
    InterpreterFor<F> {}

export type Program<A> = <F extends URIS>(F: ModelAlgebra<F>) => Kind<F, A>
export const defineAs = <A>(program: Program<A>): typeof program => cacheUnaryFunction(program)

describe('Ord', () => {
  it('returns true or false when comparing values for equality', () => {
    const Foo = defineAs(F => F.date())

    const { ord } = Foo(ordInterpreter)

    const date = new Date(12345)
    const date2 = new Date(12346)
    chai.assert.strictEqual(lt(ord)(date, date2), true)
    chai.assert.strictEqual(gt(ord)(date2, date), true)
    chai.assert.strictEqual(lt(ord)(date2, date), false)
    chai.assert.strictEqual(gt(ord)(date, date2), false)
    chai.assert.strictEqual(ord.equals(date, date), true)
    chai.assert.strictEqual(ord.equals(date, date2), false)
  })

  it('can compare set', () => {
    const Foo = defineAs(F =>
      F.set(
        F.date(),
        ord.contramap(ordNumber, (d: Date) => d.getTime())
      )
    )

    const FooOrd = Foo(ordInterpreter)

    const date = new Date(12345)
    const date2 = new Date(12346)
    const date3 = new Date(12347)
    const set1 = new Set([date, date2])
    const set2 = new Set([date2, date3])
    const set3 = new Set([date, date3])
    const isLt = lt(FooOrd.ord)
    chai.assert.strictEqual(isLt(set1, set3), true)
    chai.assert.strictEqual(isLt(set1, set2), true)
    chai.assert.strictEqual(isLt(set2, set3), false)

    const isGt = gt(FooOrd.ord)
    chai.assert.strictEqual(isGt(set3, set1), true)
    chai.assert.strictEqual(isGt(set2, set1), true)
    chai.assert.strictEqual(isGt(set3, set2), false)
  })
})

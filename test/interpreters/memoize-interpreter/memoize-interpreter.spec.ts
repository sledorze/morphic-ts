import * as chai from 'chai'
import * as t from 'io-ts'
import { defineAsUnknown, ModelAlgebra1, TypeOf, Program } from '../../utils/program'

import * as fc from 'fast-check'
import { URIS, Kind } from '../../../src/HKT'
import { ioTsStrict } from '../../../src/interpreters/io-ts/interpreters'
import { fastCheckInterpreter } from '../../../src/interpreters/fast-check/interpreters'

export const interpret = <U extends URIS>(U: U) => (F: ModelAlgebra1<U>) => <P extends Program<any, any>>(
  program: P
): Kind<U, TypeOf<typeof program>> => program(F)

export const interpretNoMemo = <U extends URIS>(U: U) => (F: ModelAlgebra1<U>) => <P extends Program<any, any>>(
  program: P
): Kind<U, TypeOf<typeof program>> => program(F)

describe('memoize', () => {
  const A = defineAsUnknown(F =>
    F.interface({
      a: F.string,
      b: F.number
    })
  )

  it('can memoize io-ts interpreter in same definition', () => {
    const C = defineAsUnknown(F => {
      const a = A(F)
      const a2 = A(F)
      chai.assert.strictEqual(a, a2)
      return F.interface({
        a,
        a2
      })
    })

    const interp = interpret('IOTSType')(ioTsStrict)
    chai.assert.strictEqual(interp(C), interp(C))

    const tA = t.interface({
      a: t.string,
      b: t.string
    })
    const tC = t.interface({
      a: tA,
      a2: tA
    })

    const c = interp(C)
    const cCasted = (c.type as any).type as typeof tC // .type because Exact type has inner type as its 'type' entry

    chai.assert.strictEqual(cCasted.props.a, cCasted.props.a2)
  })

  it('can memoize io-ts interpreterin differents definitions', () => {
    const C = defineAsUnknown(F => {
      const a = A(F)
      const a2 = A(F)
      chai.assert.strictEqual(a, a2)
      return F.interface({
        a,
        a2
      })
    })

    const D = defineAsUnknown(F => {
      const a = A(F)
      const a2 = A(F)
      chai.assert.strictEqual(a, a2)
      return F.interface({
        a,
        a2
      })
    })

    const interp = interpret('IOTSType')(ioTsStrict)
    chai.assert.strictEqual(interp(C), interp(C))

    const tA = t.interface({
      a: t.string,
      b: t.string
    })
    const tC = t.interface({
      a: tA,
      a2: tA
    })

    const c = interp(C)
    const d = interp(D)
    const cCasted = (c.type as any).type as typeof tC
    const dCasted = (d.type as any).type as typeof tC

    chai.assert.strictEqual(cCasted.props.a, cCasted.props.a2)
    chai.assert.strictEqual(dCasted.props.a, dCasted.props.a2)
    chai.assert.strictEqual(cCasted.props.a, dCasted.props.a)
    chai.assert.strictEqual(cCasted.props.a2, dCasted.props.a2)
  })
})

describe('(TODO: rename / sort that test)', () => {
  it('composes', () => {
    interface Foo {
      a: string
      b: number
    }
    const Foo = defineAsUnknown(F =>
      F.interface({
        a: F.string,
        b: F.number
      })
    )

    const Bar = defineAsUnknown<BarType>(F =>
      F.interface({
        a: Foo(F),
        c: Foo(F),
        d: Foo(F),
        b: F.number
      })
    )

    interface BarType {
      a: {
        a: string
        b: number
      }
      c: {
        a: string
        b: number
      }
      d: {
        a: string
        b: number
      }
      b: number
    }
    const fastCheckInterp = interpretNoMemo('FastCheckType')(fastCheckInterpreter)
    const iotsInterp = interpretNoMemo('IOTSType')(ioTsStrict)

    fc.assert(fc.property(fastCheckInterp(Bar).arb, iotsInterp(Bar).type.is))
  })
})

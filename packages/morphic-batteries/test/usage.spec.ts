import { modelFastCheckInterpreter } from '@morphic-ts/fastcheck-interpreters/lib/interpreters'
import { modelShowInterpreter } from '@morphic-ts/show-interpreters/lib/interpreters'
import { interpretable, makeTagged } from '@morphic-ts/summoners'
import * as chai from 'chai'
import { assert as FCassert, property } from 'fast-check'
import { isRight, right } from 'fp-ts/Either'
import type { Newtype } from 'newtype-ts'
import { iso } from 'newtype-ts'

import type { M as MBASTJ } from '../src/summoner-BASTJ'
import { summonFor as summonBASTJFor } from '../src/summoner-BASTJ'
import { summonFor as summonESBASTJFor } from '../src/summoner-ESBASTJ'
import { summonFor as summonESBSTFor } from '../src/summoner-ESBST'

const { summon: summonBASTJ } = summonBASTJFor<{}>({})
const { summon: summonESBASTJ } = summonESBASTJFor<{}>({})
const { summon: summonESBST } = summonESBSTFor<{}>({})

describe('tagged', () => {
  it('Should be reused to create another Morph', () => {
    const AType = summonBASTJ(F => F.interface({ type: F.stringLiteral('AType') }, { name: 'AType' }))
    const BType = summonBASTJ(F => F.interface({ type: F.stringLiteral('BType') }, { name: 'BType' }))
    const tagged = makeTagged(summonBASTJ)
    const Union = tagged('type')({ AType, BType })
    const Used = summonBASTJ(F => F.interface({ x: Union(F) }, { name: 'Used' }))
    chai.assert.deepStrictEqual(isRight(Used.jsonSchema), true)
  })

  it('Should infer E in addition of A when be used into another Morph', () => {
    const AType = summonBASTJ(F => F.interface({ type: F.stringLiteral('AType') }, { name: 'AType' }))
    const BType = summonBASTJ(F => F.interface({ type: F.stringLiteral('BType') }, { name: 'BType' }))
    const tagged = makeTagged(summonBASTJ)
    const Union = tagged('type')({ AType, BType })
    const Used = summonBASTJ(F => F.interface({ x: Union(F) }, { name: 'Used' }))
    const v = Used.build({ x: { type: 'AType' } })
    const x: { x: { type: string } } = Used.type.encode(v) // Would error if Output type not inferred correctly
    chai.assert.deepStrictEqual(x, v)
    chai.assert.deepStrictEqual(isRight(Used.jsonSchema), true)
  })

  it('Can constraint A type param', () => {
    const CType = summonBASTJ(F => F.interface({ tag: F.stringLiteral('CType') }, { name: 'CType' }))
    const Action = <E, P>(_p: MBASTJ<{}, E, P & { type?: never }>): void => undefined
    Action(CType) // Should not become red
  })

  it('Should infer E in addition of A when be used into another Morph', () => {
    interface AType {
      type: 'AType'
    }
    interface BType {
      type: 'BType'
    }
    interface CType {
      type: 'CType'
    }
    interface ARawType {
      type: string
    }
    interface BRawType {
      type: string
    }
    interface CRawType {
      type: string
    }
    const AType = summonBASTJ<ARawType, AType>(F => F.interface({ type: F.stringLiteral('AType') }, { name: 'AType' }))
    const BType = summonBASTJ<BRawType, BType>(F => F.interface({ type: F.stringLiteral('BType') }, { name: 'BType' }))
    const CType = summonBASTJ<CRawType, CType>(F => F.interface({ type: F.stringLiteral('CType') }, { name: 'CType' }))

    const a = AType.build({ type: 'AType' })
    const b = BType.build({ type: 'BType' })
    const c = CType.build({ type: 'CType' })

    const tagged = makeTagged(summonBASTJ)

    const UnionABC = tagged('type')({ AType, BType, CType })

    chai.assert.deepStrictEqual(UnionABC.type.is(a), true)
    chai.assert.deepStrictEqual(UnionABC.type.is(b), true)
    chai.assert.deepStrictEqual(UnionABC.type.is(c), true)

    const UnionAB = UnionABC.selectMorph(['AType', 'BType'])

    chai.assert.deepStrictEqual(UnionAB.type.is(a), true)
    chai.assert.deepStrictEqual(UnionAB.type.is(b), true)
    chai.assert.deepStrictEqual(UnionAB.type.is(c), false)

    const UnionBC = UnionABC.excludeMorph(['AType'])

    chai.assert.deepStrictEqual(UnionBC.type.is(a), false)
    chai.assert.deepStrictEqual(UnionBC.type.is(b), true)
    chai.assert.deepStrictEqual(UnionBC.type.is(c), true)
  })

  it('can be composed with richer Morphs', () => {
    const T = summonESBASTJ(F => F.date())
    const R = summonBASTJ(F =>
      F.interface(
        {
          a: T(F)
        },
        { name: 'R' }
      )
    )
    chai.assert.deepStrictEqual(
      R.type.decode({ a: '2020-02-11T11:00:00' }),
      right({ a: new Date(2020, 1, 11, 11, 0, 0) })
    )
  })

  it('can fully be reinterpreted with an interpreter', () => {
    interface NT extends Newtype<{ readonly NT: unique symbol }, Date> {}
    const Thing = summonESBASTJ(F =>
      F.interface({ date: F.newtype<NT>()(F.date(), { name: 'NT' }), name: F.string() }, { name: 'Thing' })
    )

    const date = new Date(2020, 2, 20, 2, 20, 20)
    const show = interpretable(Thing)(modelShowInterpreter<{}>())({}).show
    const x = Thing.build({ date: iso<NT>().wrap(date), name: 'georges' })
    chai.assert.deepStrictEqual(show.show(x), `{ date: <NT>(${date.toISOString()}), name: "georges" }`)
  })
})

describe('Morph ESBST', () => {
  it('can be derived to a fastCheck', () => {
    const Person = summonESBST(F =>
      F.interface(
        {
          name: F.string(),
          birthdate: F.date()
        },
        { name: 'Person' }
      )
    )
    const PersonARB = Person.derive(modelFastCheckInterpreter<{}>())({})
    FCassert(property(PersonARB.arb, Person.type.is))
  })
})

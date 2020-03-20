import * as chai from 'chai'
import { summon as summonBASTJ, M as MBASTJ } from '../src/summoner-BASTJ'
import * as E from 'fp-ts/lib/Either'
import { makeTagged } from '../src/usage/tagged-union'
import { summon as summonESBASTJ } from '../src/summoner-ESBASTJ'
import { FastCheckURI } from '@morphic-ts/fastcheck-interpreters'
import { JsonSchemaURI } from '@morphic-ts/json-schema-interpreters/lib'
import { EqURI } from '@morphic-ts/eq-interpreters/lib'
import { ShowURI } from '@morphic-ts/show-interpreters/lib'
import { IoTsURI } from '@morphic-ts/io-ts-interpreters/lib'
import { OrdURI } from '@morphic-ts/ord-interpreters/lib'
import { identity } from 'fp-ts/lib/function'
import { Eq, eq, eqNumber } from 'fp-ts/lib/Eq'
import { Show } from 'fp-ts/lib/Show'
import * as T from 'fp-ts/lib/Tuple'
import { ord, ordNumber } from 'fp-ts/lib/Ord'

describe('tagged', () => {
  it('Should be used into another Morph', () => {
    const AType = summonBASTJ(F => F.interface({ type: F.stringLiteral('AType') }, 'AType'))
    const BType = summonBASTJ(F => F.interface({ type: F.stringLiteral('BType') }, 'BType'))
    const tagged = makeTagged(summonBASTJ)
    const Union = tagged('type')({ AType, BType })
    const Used = summonBASTJ(F => F.interface({ x: Union(F) }, 'Used'))
    chai.assert.deepStrictEqual(E.isRight(Used.jsonSchema), true)
  })

  it('Should infer E in addition of A when be used into another Morph', () => {
    const AType = summonBASTJ(F => F.interface({ type: F.stringLiteral('AType') }, 'AType'))
    const BType = summonBASTJ(F => F.interface({ type: F.stringLiteral('BType') }, 'BType'))
    const tagged = makeTagged(summonBASTJ)
    const Union = tagged('type')({ AType, BType })
    const Used = summonBASTJ(F => F.interface({ x: Union(F) }, 'Used'))
    const v = Used.build({ x: { type: 'AType' } })
    const x: { x: { type: string } } = Used.type.encode(v) // Would error if Output type not inferred correctly
    chai.assert.deepStrictEqual(x, v)
    chai.assert.deepStrictEqual(E.isRight(Used.jsonSchema), true)
  })

  it('Can constraint A type param', () => {
    const CType = summonBASTJ(F => F.interface({ tag: F.stringLiteral('CType') }, 'CType'))
    const Action = <E, P>(_p: MBASTJ<E, P & { type?: never }>): void => undefined
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
    const AType = summonBASTJ<ARawType, AType>(F => F.interface({ type: F.stringLiteral('AType') }, 'AType'))
    const BType = summonBASTJ<BRawType, BType>(F => F.interface({ type: F.stringLiteral('BType') }, 'BType'))
    const CType = summonBASTJ<CRawType, CType>(F => F.interface({ type: F.stringLiteral('CType') }, 'CType'))

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
        'R'
      )
    )
    chai.assert.deepStrictEqual(
      R.type.decode({ a: '2020-02-11T11:00:00' }),
      E.right({ a: new Date(2020, 2, 11, 11, 0, 0) })
    )
  })
})

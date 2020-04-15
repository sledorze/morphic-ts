import * as chai from 'chai'
import { summonFor as summonBASTJFor, M as MBASTJ } from '../src/summoner-BASTJ'
import { summonFor as summonESBSTFor } from '../src/summoner-ESBST'
import * as E from 'fp-ts/lib/Either'
import { makeTagged } from '../src/usage/tagged-union'
import { summonFor as summonESBASTJFor } from '../src/summoner-ESBASTJ'
import { interpretable } from '../src/usage/programs-infer'
import { modelShowInterpreter } from '@morphic-ts/show-interpreters/lib/interpreters'
import { Newtype, iso } from 'newtype-ts'
import { modelFastCheckInterpreter, FastCheckURI } from '@morphic-ts/fastcheck-interpreters/lib/interpreters'
import * as fc from 'fast-check'
import { IoTsURI } from '@morphic-ts/io-ts-interpreters/lib/hkt'
import { fastCheckConfig } from '@morphic-ts/fastcheck-interpreters/lib/config'
import { iotsConfig } from '@morphic-ts/io-ts-interpreters/lib/config'
import * as WM from 'io-ts-types/lib/withMessage'
import { PathReporter } from 'io-ts/lib/PathReporter'

const { summon: summonBASTJ } = summonBASTJFor<{}>({})
const { summon: summonESBASTJ } = summonESBASTJFor<{}>({})
const { summon: summonESBST } = summonESBSTFor<{}>({})

describe('tagged', () => {
  it('Should be reused to create another Morph', () => {
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
    const Action = <E, P>(_p: MBASTJ<unknown, E, P & { type?: never }>): void => undefined
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
    const T = summonESBASTJ(F => F.date)
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
      E.right({ a: new Date(2020, 1, 11, 11, 0, 0) })
    )
  })

  it('can fully be reinterpreted with an interpreter', () => {
    interface NT extends Newtype<{ readonly NT: unique symbol }, Date> {}
    const Thing = summonESBASTJ(F => F.interface({ date: F.newtype<NT>('NT')(F.date), name: F.string }, 'Thing'))

    const date = new Date(2020, 2, 20, 2, 20, 20)
    const show = interpretable(Thing)(modelShowInterpreter)({}).show
    const x = Thing.build({ date: iso<NT>().wrap(date), name: 'georges' })
    chai.assert.deepStrictEqual(show.show(x), `{ date: <NT>(${date.toISOString()}), name: "georges" }`)
  })
})

describe('Morph ESBST', () => {
  it('can be derived to a fastCheck', () => {
    const Person = summonESBST(F =>
      F.interface(
        {
          name: F.string,
          birthdate: F.date
        },
        'Person'
      )
    )
    const PersonARB = Person.derive(modelFastCheckInterpreter)({})
    fc.assert(fc.property(PersonARB.arb, Person.type.is))
  })
})

describe('Can specify envs', () => {
  interface FastCheckEnv {
    fastCheck: typeof fc
  }
  interface IoTsEnv {
    withMessage: typeof WM
  }
  interface AppEnv {
    [IoTsURI]: IoTsEnv
    [FastCheckURI]: FastCheckEnv
  }

  // summonESBSTFor only requiers eq, show and iots
  // AppEnv only specify Environements for fastCheck and iots
  // So we only need to provide the IoTsEnv to create the Summoner
  const { summon } = summonESBSTFor<AppEnv>({
    [IoTsURI]: { withMessage: WM }
  })

  // MorphA has M<AppEnv, string, string> signature (note the AppEnv environement specified)
  const MorphA = summon(F =>
    F.stringCfg({
      ...fastCheckConfig((_x, e: FastCheckEnv) => e.fastCheck.string(1)), // We're using the FastCheckEnv here, that only type checks because summon defines it as Env
      ...iotsConfig((_x, e: IoTsEnv) => e.withMessage.withMessage(_x, x => `damn! got ${x}`))
    })
  )

  it('Can specify a wider Env than what is needed to provide to a summon', () => {
    chai.assert.deepStrictEqual(PathReporter.report(MorphA.type.decode(4)), ['damn! got 4'])
    chai.assert.deepStrictEqual(MorphA.type.decode('4'), E.right('4'))
  })

  it('Can reuse a Summon definition into another summon with additional Type classes Scopes ', () => {
    /**
     * Because ESBASTJ define fastCheck instances, it requires AppEnv's Environnement for fastCheck
     */
    const { summon: summonESBASTJX } = summonESBASTJFor<AppEnv>({
      [IoTsURI]: {
        withMessage: WM
      },
      [FastCheckURI]: {
        fastCheck: fc
      }
    })

    /**
     * MorphA, even if created from another Summoner is compatible and can be safely used with summonESBST, all instances will correctly be generated
     */
    const MorphB = summonESBASTJX(MorphA)
    fc.assert(fc.property(MorphB.arb, x => x.length <= 1))
    chai.assert.deepStrictEqual(PathReporter.report(MorphB.type.decode(4)), ['damn! got 4'])
    chai.assert.deepStrictEqual(MorphB.type.decode('4'), E.right('4'))
  })
})

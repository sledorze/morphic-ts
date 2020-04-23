import * as chai from 'chai'
import { summonFor as summonESBSTFor } from '../src/summoner-ESBST'
import * as E from 'fp-ts/lib/Either'
import { summonFor as summonESBASTJFor } from '../src/summoner-ESBASTJ'
import { modelFastCheckInterpreter, FastCheckURI } from '@morphic-ts/fastcheck-interpreters/lib/interpreters'
import * as fc from 'fast-check'
import { IoTsURI } from '@morphic-ts/io-ts-interpreters/lib/hkt'
import { fastCheckConfig } from '@morphic-ts/fastcheck-interpreters/lib/config'
import { iotsConfig } from '@morphic-ts/io-ts-interpreters/lib/config'
import * as WM from 'io-ts-types/lib/withMessage'
import { PathReporter } from 'io-ts/lib/PathReporter'

describe('Morph Config Env', () => {
  interface FastCheckEnv {
    fc: typeof fc
  }

  it('can customise fastCheck via en Env', () => {
    const MaxAgeMs = 70 * 365 * 24 * 60 * 60 * 1000

    const { summon } = summonESBASTJFor<{ FastCheckURI: FastCheckEnv }>({
      FastCheckURI: { fc }
    })

    const Person = summon(F =>
      F.interface(
        {
          name: F.string(),
          birthdate: F.date({
            ...fastCheckConfig((_x, e) => {
              const now = new Date()
              return e.fc.date({ min: now, max: new Date(now.getTime() + MaxAgeMs) })
            })
          })
        },
        'Person'
      )
    )
    fc.assert(fc.property(Person.arb, Person.type.is))
  })

  it('can customise fastCheck using derivation via en Env', () => {
    const MaxAgeMs = 70 * 365 * 24 * 60 * 60 * 1000

    const { summon } = summonESBSTFor<{ FastCheckURI: FastCheckEnv }>({})

    const Person = summon(F =>
      F.interface(
        {
          name: F.string(),
          birthdate: F.date({
            ...fastCheckConfig((_x, e) => {
              const now = new Date()
              return e.fc.date({ min: now, max: new Date(now.getTime() + MaxAgeMs) })
            })
          })
        },
        'Person'
      )
    )
    const PersonARB = Person.derive(modelFastCheckInterpreter<{ FastCheckURI: FastCheckEnv }>())({
      FastCheckURI: { fc }
    })
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

  // summonESBSTFor only requires eq, show and iots
  // AppEnv only specify Environements for fastCheck and iots
  // So we only need to provide the IoTsEnv to create the Summoner
  const { summon } = summonESBSTFor<AppEnv>({
    [IoTsURI]: { withMessage: WM }
  })

  // MorphA has M<AppEnv, string, string> signature (note the AppEnv environement specified)
  const MorphA = summon(F =>
    F.string({
      ...fastCheckConfig((_x, { fastCheck }) => fastCheck.string(1)), // We're using the FastCheckEnv here, that only type checks because summon defines it as Env
      ...iotsConfig((_x, { withMessage }) => withMessage.withMessage(_x, x => `damn! got ${x}`))
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

  it('Can ', () => {
    const { summon: summonESBASTJIOTS } = summonESBASTJFor<{
      [IoTsURI]: IoTsEnv
    }>({
      [IoTsURI]: {
        withMessage: WM
      }
    })

    const { summon: summonESBASTJIOTS2 } = summonESBASTJFor<{
      [IoTsURI]: IoTsEnv & { a: string }
    }>({
      [IoTsURI]: {
        withMessage: WM,
        a: 'a'
      }
    })

    const { summon: summonESBASTJAppEnv } = summonESBASTJFor<AppEnv>({
      [IoTsURI]: {
        withMessage: WM
      },
      [FastCheckURI]: {
        fastCheck: fc
      }
    })

    const m = summonESBASTJIOTS(F => F.string())
    // tslint:disable-next-line: no-unnecessary-callback-wrapper
    summonESBASTJAppEnv(F => m(F)) // Good: OK, should be OK
    summonESBASTJAppEnv(m) // Good: OK, should be OK

    // const n = summonESBASTJAppEnv(F => F.string())
    // // tslint:disable-next-line: no-unnecessary-callback-wrapper
    // summonESBASTJIOTS(F => n(F)) // Good: No OK, should be Not OK
    // summonESBASTJIOTS(n) // Good: No OK, should be Not OK

    const o = summonESBASTJIOTS(F => F.string())
    // tslint:disable-next-line: no-unnecessary-callback-wrapper
    summonESBASTJIOTS2(F => o(F)) // Good: OK, should be OK
    summonESBASTJIOTS2(o) // Good: OK, should be OK

    // const p = summonESBASTJIOTS2(F => F.string())
    // // tslint:disable-next-line: no-unnecessary-callback-wrapper
    // summonESBASTJIOTS(F => p(F)) // Good: No OK, should be OK
    // summonESBASTJIOTS(p) // Good: No OK, should be OK
  })
})

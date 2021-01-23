import * as fc from 'fast-check'
import { either as E } from 'fp-ts'
import { identity, pipe } from 'fp-ts/function'
import * as t from 'io-ts'

import { summonFor } from '../src/summoner-ESBAST'
import { modelFastCheckInterpreter } from './../../morphic-fastcheck-interpreters/src/interpreters'

const { summon } = summonFor<{}>({})

const origT = summon(F => F.array(F.string()))
const T = summon(F => F.array(F.string(), { IoTsURI: (c, e, { type }) => t.readonlyArray(type) }))
const Tarb = origT.derive(modelFastCheckInterpreter())({})

describe('Array type in config', () => {
  it('behave as normal', () => {
    fc.assert(
      fc.property(Tarb.arb, sample =>
        pipe(
          origT.type.decode(T.type.encode(sample)),
          E.chain(a =>
            pipe(
              T.type.decode(origT.type.encode(sample)),
              E.map(b => origT.eq.equals(a, b))
            )
          ),
          E.fold(_ => false, identity)
        )
      )
    )
  })
})

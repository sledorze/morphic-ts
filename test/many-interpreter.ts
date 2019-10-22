// import * as chai from 'chai'

import { Program, defineAs } from './utils/program-no-union'
import { eqInterpreter } from '../src/interpreters/eq/interpreters'
import { showInterpreter } from '../src/interpreters/show/interpreters'
import { builderInterpreter } from '../src/interpreters/builder/interpreters'
import { fastCheckInterpreter } from '../src/interpreters/fast-check/interpreters'
import { ioTsNonStrict } from '../src/interpreters/io-ts/interpreters'
import { ioTsStringNonStrict } from '../src/interpreters/io-ts-string/interpreters'
import { jsonSchemaInterpreter } from '../src/interpreters/json-schema/interpreters'
import { matcherInterpreter } from '../src/interpreters/matcher/interpreters'

export const materialize = <E, A>(program: Program<E, A>) => {
  const { fold, foldOn, foldOnWiden } = program(matcherInterpreter)

  return {
    eq: program(eqInterpreter).eq,
    show: program(showInterpreter).show,
    make: program(builderInterpreter).builder,
    arb: program(fastCheckInterpreter).arb,
    strictType: program(ioTsNonStrict).type,
    type: program(ioTsStringNonStrict).type,
    jsonSchema: program(jsonSchemaInterpreter).schema.json,
    fold,
    foldOn,
    foldOnWiden
  }
}

describe('Eq', () => {
  it('returns false when comparing incomplete values', () => {
    const TypeDef = defineAs(F =>
      F.taggedUnion('type', {
        foo: F.interface({
          type: F.stringLiteral('foo'), // <- Ici on ne détecte pas!
          date: F.date,
          a: F.string
        }),
        bar: F.interface({
          type: F.stringLiteral('bar'),
          items: F.array(F.interface({ name: F.string }))
        })
      })
    )

    const Type = materialize(TypeDef)

    const vFoo = Type.make({ type: 'foo', a: 'z', date: new Date() })
    const vBar = Type.make({ type: 'bar', items: [] })
    const x = Type.foldOn('type')({
      bar: ({ items }) => items.length,
      foo: ({ date }) => date.getTime()
    })(vBar)

    console.log(`x ${x}`)
    Type.eq.equals(vFoo, vBar)
    console.log(`Swagger ${JSON.stringify(Type.jsonSchema)}`)
    console.log(`Encoded  ${JSON.stringify(Type.type.encode(vBar))}`)
    console.log(`Encoded  ${JSON.stringify(Type.type.encode(vFoo))}`)

    // Type.arb.generate(...)

    // const date = new Date(12345)
    // chai.assert.strictEqual(eq.equals({ date, a: '' }, { date } as any), false)
  })
})

import * as chai from 'chai'
import { Program, defineAs } from './utils/program-no-union'
import { eqInterpreter } from '../src/interpreters/eq/interpreters'
import { showInterpreter } from '../src/interpreters/show/interpreters'
import { builderInterpreter } from '../src/interpreters/builder/interpreters'
import { fastCheckInterpreter } from '../src/interpreters/fast-check/interpreters'
import { ioTsNonStrict } from '../src/interpreters/io-ts/interpreters'
import { ioTsStringNonStrict } from '../src/interpreters/io-ts-string/interpreters'
import { jsonSchemaInterpreter } from '../src/interpreters/json-schema/interpreters'
import * as fc from 'fast-check'
import { right } from 'fp-ts/lib/Either'

export const materialize = <E, A>(program: Program<E, A>) => {
  return {
    eq: program(eqInterpreter).eq,
    show: program(showInterpreter).show,
    ...program(builderInterpreter),
    arb: program(fastCheckInterpreter).arb,
    strictType: program(ioTsNonStrict).type,
    type: program(ioTsStringNonStrict).type,
    jsonSchema: program(jsonSchemaInterpreter).schema.json
  }
}

describe('several interpreters', () => {
  it('can be derived from a single definition', () => {
    const FooDef = defineAs(F =>
      F.interface({
        type: F.stringLiteral('foo'),
        date: F.date,
        a: F.string
      })
    )

    const BarDef = defineAs(F =>
      F.interface({
        type: F.stringLiteral('bar'),
        items: F.array(F.interface({ name: F.string }))
      })
    )

    const TypeDef = defineAs(F =>
      F.taggedUnion('type', {
        foo: FooDef(F),
        bar: BarDef(F)
      })
    )

    const Type = materialize(TypeDef)

    const [value1, value2] = fc.sample(Type.arb, 2)

    chai.assert.isTrue(Type.type.is(value1), 'io-ts')
    chai.assert.deepEqual(Type.type.decode(Type.type.encode(value1)), right(value1), 'io-ts encode / decode')
    chai.assert.isString(Type.show.show(value1), 'Show')
    chai.assert.isObject(Type.jsonSchema, 'JsonSchema')
    chai.assert.isTrue(Type.eq.equals(value1, value1), 'Eq true')
    chai.assert.isFalse(Type.eq.equals(value1, value2), 'Eq false')

    const value = Type.of({ type: 'foo', date: new Date(), a: 'a' })
    chai.assert.isTrue(Type.type.is(value), 'make')

    const barFoo = Type.byTag('type')
    const res = barFoo.matchWiden({
      bar: () => 1,
      foo: x => x
    })(value)

    chai.assert.isTrue(Type.type.is(res), 'foldOnWiden')
  })
})

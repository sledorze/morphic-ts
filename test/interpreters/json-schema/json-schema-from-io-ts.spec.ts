import * as chai from 'chai'
import { summon } from '../../../src/utils/summoner'
import { right, left } from 'fp-ts/lib/Either'
import { either } from 'fp-ts'
import { JsonSchemaErrors } from '../../../src/json-schema/json-schema-ctors'
import { of } from 'fp-ts/lib/NonEmptyArray'
import { tuple } from 'fp-ts/lib/function'

describe('a json schema generator', function(this: any) {
  it('generate an interface from a io-ts interface', () => {
    const decoder = summon(F =>
      F.interface(
        {
          toto: F.number()
        },
        'Toto'
      )
    )

    const schema = decoder.jsonSchema

    chai.assert.deepStrictEqual(
      schema,
      right(
        tuple(
          {
            required: ['toto'],
            properties: {
              toto: {
                type: 'number' as const
              }
            },
            type: 'object' as const
          },
          {}
        )
      )
    )
  })

  it('generate an interface from a partial', () => {
    const decoder = summon(F =>
      F.partial(
        {
          toto: F.number()
        },
        'Toto'
      )
    )

    const schema = decoder.jsonSchema

    chai.assert.deepStrictEqual(
      schema,
      right(
        tuple(
          {
            properties: {
              toto: {
                type: 'number' as const
              }
            },
            type: 'object' as const
          },
          {}
        )
      )
    )
  })

  it('generate an interface from an intersection', () => {
    const decoder = summon(F =>
      F.intersection(
        [F.partial({ toto: F.number() }, 'Toto'), F.interface({ tata: F.number() }, 'Tata')],
        'TotoAndTata'
      )
    )

    const schema = decoder.jsonSchema

    chai.assert.deepStrictEqual(
      schema,
      right(
        tuple(
          {
            required: ['tata'],
            properties: {
              toto: { type: 'number' as const },
              tata: { type: 'number' as const }
            },
            type: 'object' as const
          },
          {}
        )
      )
    )
  })

  it('generate from a complex type', () => {
    const decoder = summon(F => F.interface({ arr: F.array(F.interface({ x: F.string() }, 'X'), {}) }, 'Arrs'))
    const schema = decoder.jsonSchema

    chai.assert.deepStrictEqual(
      schema,
      right(
        tuple(
          {
            type: 'object' as const,
            required: ['arr'],
            properties: {
              arr: {
                type: 'array' as const,
                items: {
                  type: 'object' as const,
                  properties: { x: { type: 'string' as const } },
                  required: ['x']
                }
              }
            }
          },
          {}
        )
      )
    )
  })

  it('use name as description for intersection', () => {
    const decoder = summon(F =>
      F.intersection([F.interface({ a: F.string() }, 'A'), F.interface({ b: F.number() }, 'B')], 'AB')
    )

    const schema = decoder.jsonSchema

    chai.assert.deepStrictEqual(
      schema,
      right(
        tuple(
          {
            properties: { a: { type: 'string' as const }, b: { type: 'number' as const } },
            required: ['a', 'b'],
            type: 'object' as const
          },
          {}
        )
      )
    )
  })

  it('use underlying names as description for unnamed intersection', () => {
    const decoder = summon(F =>
      F.intersection([F.interface({ a: F.string() }, 'A'), F.interface({ b: F.number() }, 'B')], 'AB')
    )
    const schema = decoder.jsonSchema

    chai.assert.deepStrictEqual(
      schema,
      right(
        tuple(
          {
            properties: { a: { type: 'string' as const }, b: { type: 'number' as const } },
            required: ['a', 'b'],
            type: 'object' as const
          },
          {}
        )
      )
    )
  })

  it('use underlying name as description for unnamed intersection', () => {
    const decoder = summon(F =>
      F.intersection([F.interface({ a: F.string() }, 'A'), F.interface({ b: F.number() }, 'B')], 'AB')
    )

    const schema = decoder.jsonSchema

    chai.assert.deepStrictEqual(
      schema,
      right(
        tuple(
          {
            properties: { a: { type: 'string' as const }, b: { type: 'number' as const } },
            required: ['a', 'b'],
            type: 'object' as const
          },
          {}
        )
      )
    )
  })

  it('works with OptionFromNullable!', () => {
    const decoder = summon(F => F.interface({ a: F.nullable(F.string()), b: F.string() }, 'AB'))

    const schema = decoder.jsonSchema

    chai.assert.deepStrictEqual(
      schema,
      right(
        tuple(
          {
            properties: { a: { type: 'string' as const }, b: { type: 'string' as const } },
            required: ['b'],
            type: 'object' as const
          },
          {}
        )
      )
    )
  })

  it('does not work with OptionFromNullable in Array!', () => {
    const decoder = summon(F => F.interface({ as: F.array(F.nullable(F.string()), {}) }, 'AS'))

    const schema = () => decoder.jsonSchema

    chai.assert.deepStrictEqual(
      either.either.mapLeft(schema(), v => v),
      left(of(JsonSchemaErrors.ArrayConsumesNoOptional))
    )
  })

  it('works for LiteralType', () => {
    const decoder = summon(F => F.interface({ type: F.stringLiteral('toto') }, 'Toto'))

    const schema = decoder.jsonSchema

    chai.assert.deepStrictEqual(
      schema,
      right(
        tuple(
          {
            properties: { type: { type: 'string' as const, enum: ['toto'] } },
            required: ['type'],
            type: 'object' as const
          },
          {}
        )
      )
    )
  })

  it('encodes anonymous KeyOfType inplace ', () => {
    const decoder = summon(F =>
      F.interface(
        {
          type: F.keysOf({
            toto: null,
            tutu: null
          })
        },
        'Toto'
      )
    )

    const schema = decoder.jsonSchema

    chai.assert.deepStrictEqual(
      schema,
      right(
        tuple(
          {
            properties: {
              type: {
                type: 'string' as const,
                enum: ['toto', 'tutu']
              }
            },
            required: ['type'],
            type: 'object' as const
          },
          {}
        )
      )
    )
  })

  it('encodes names with KeyOfType ', () => {
    const decoder = summon(F =>
      F.interface(
        {
          type: F.keysOf(
            {
              toto: null,
              tutu: null
            }
            // 'TotoTypes'
          )
        },
        'Toto'
      )
    )

    const schema = decoder.jsonSchema

    chai.assert.deepStrictEqual(
      schema,
      right(
        tuple(
          {
            properties: {
              type: {
                type: 'string' as const,
                enum: ['toto', 'tutu']
              }
            },
            required: ['type'],
            type: 'object' as const
          },
          {}
        )
      )
    )
  })
})

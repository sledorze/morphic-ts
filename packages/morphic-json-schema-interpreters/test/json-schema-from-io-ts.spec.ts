import * as chai from 'chai'
import { summon, UM } from '@sledorze/morphic-batteries/lib/summoner'
import { right, left } from 'fp-ts/lib/Either'
import { either } from 'fp-ts'
import { JsonSchemaErrors } from '../src/json-schema/json-schema-ctors'
import { of } from 'fp-ts/lib/NonEmptyArray'
import { tuple } from 'fp-ts/lib/function'
import { JSONSchema } from '../src/json-schema/json-schema'

export type Tree = Node | Leaf
export interface Node {
  type: 'node'
  a: Tree
  b: Tree
}
export interface Leaf {
  type: 'leaf'
  v: string
}

export type GTree<A> = GNode<A> | GLeaf<A>
export interface GNode<A> {
  type: 'node'
  a: GTree<A>
  b: GTree<A>
}
export interface GLeaf<A> {
  type: 'leaf'
  v: A
}

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

    const Toto: JSONSchema = {
      required: ['toto'],
      properties: {
        toto: {
          type: 'number' as const
        }
      },
      type: 'object' as const
    }
    chai.assert.deepStrictEqual(schema, right(tuple(Toto, { Toto })))
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

    const Toto: JSONSchema = {
      properties: {
        toto: {
          type: 'number' as const
        }
      },
      type: 'object' as const
    }
    chai.assert.deepStrictEqual(schema, right(tuple(Toto, { Toto })))
  })

  it('generate an interface from an intersection', () => {
    const decoder = summon(F =>
      F.intersection(
        [F.partial({ toto: F.number() }, 'Toto'), F.interface({ tata: F.number() }, 'Tata')],
        'TotoAndTata'
      )
    )

    const schema = decoder.jsonSchema

    const Toto: JSONSchema = {
      properties: {
        toto: { type: 'number' as const }
      },
      type: 'object' as const
    }
    const Tata: JSONSchema = {
      required: ['tata'],
      properties: {
        tata: { type: 'number' as const }
      },
      type: 'object' as const
    }
    const TotoAndTata: JSONSchema = {
      required: ['tata'],
      properties: {
        toto: { type: 'number' as const },
        tata: { type: 'number' as const }
      },
      type: 'object' as const
    }

    chai.assert.deepStrictEqual(schema, right(tuple(TotoAndTata, { TotoAndTata, Toto, Tata })))
  })

  it('generate from a complex type', () => {
    const decoder = summon(F => F.interface({ arr: F.array(F.interface({ x: F.string() }, 'X'), {}) }, 'Arrs'))
    const schema = decoder.jsonSchema

    const X: JSONSchema = {
      type: 'object' as const,
      properties: { x: { type: 'string' as const } },
      required: ['x']
    }
    const Arrs: JSONSchema = {
      type: 'object' as const,
      required: ['arr'],
      properties: {
        arr: {
          type: 'array' as const,
          items: { $ref: 'X' }
        }
      }
    }
    chai.assert.deepStrictEqual(schema, right(tuple(Arrs, { X, Arrs })))
  })

  it('encodes an intersection', () => {
    const decoder = summon(F =>
      F.intersection([F.interface({ a: F.string() }, 'A'), F.interface({ b: F.number() }, 'B')], 'AB')
    )

    const schema = decoder.jsonSchema

    const A: JSONSchema = {
      properties: { a: { type: 'string' as const } },
      required: ['a'],
      type: 'object' as const
    }
    const B: JSONSchema = {
      properties: { b: { type: 'number' as const } },
      required: ['b'],
      type: 'object' as const
    }
    const AB: JSONSchema = {
      properties: { a: { type: 'string' as const }, b: { type: 'number' as const } },
      required: ['a', 'b'],
      type: 'object' as const
    }

    chai.assert.deepStrictEqual(schema, right(tuple(AB, { AB, A, B })))
  })

  it('works with OptionFromNullable!', () => {
    const decoder = summon(F => F.interface({ a: F.nullable(F.string()), b: F.string() }, 'AB'))

    const schema = decoder.jsonSchema

    const AB: JSONSchema = {
      properties: { a: { type: 'string' as const }, b: { type: 'string' as const } },
      required: ['b'],
      type: 'object' as const
    }

    chai.assert.deepStrictEqual(schema, right(tuple(AB, { AB })))
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

    const Toto: JSONSchema = {
      properties: { type: { type: 'string' as const, enum: ['toto'] } },
      required: ['type'],
      type: 'object' as const
    }

    chai.assert.deepStrictEqual(schema, right(tuple(Toto, { Toto })))
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

    const Toto: JSONSchema = {
      properties: {
        type: {
          type: 'string' as const,
          enum: ['toto', 'tutu']
        }
      },
      required: ['type'],
      type: 'object' as const
    }

    const schema = decoder.jsonSchema

    chai.assert.deepStrictEqual(schema, right(tuple(Toto, { Toto })))
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

    const Toto: JSONSchema = {
      properties: {
        type: {
          type: 'string' as const,
          enum: ['toto', 'tutu']
        }
      },
      required: ['type'],
      type: 'object' as const
    }

    const schema = decoder.jsonSchema

    chai.assert.deepStrictEqual(schema, right(tuple(Toto, { Toto })))
  })

  it('handles generic recursive types', () => {
    const getTree = <A>(LeafValue: UM<A>): UM<GTree<A>> =>
      summon(F =>
        F.recursive(
          GTree =>
            F.taggedUnion(
              'type',
              {
                node: F.interface({ type: F.stringLiteral('node'), a: GTree, b: GTree }, 'Node'),
                leaf: F.interface({ type: F.stringLiteral('leaf'), v: LeafValue(F) }, 'Leaf')
              },
              'Tree'
            ),
          'TreeRec'
        )
      )

    const numberValue = summon(F => F.number())

    const { jsonSchema } = getTree(numberValue)

    const Leaf: JSONSchema = {
      properties: {
        type: {
          enum: ['leaf'],
          type: 'string'
        },
        v: {
          type: 'number'
        }
      },
      required: ['type', 'v'],
      type: 'object'
    }

    const Node: JSONSchema = {
      properties: {
        a: {
          $ref: 'TreeRec'
        },
        b: {
          $ref: 'TreeRec'
        },
        type: {
          enum: ['node'],
          type: 'string'
        }
      },
      required: ['a', 'b', 'type'],
      type: 'object'
    }

    const TreeRec: JSONSchema = {
      oneOf: [{ $ref: 'Leaf' }, { $ref: 'Node' }],
      type: 'object'
    }

    chai.assert.deepStrictEqual(jsonSchema, right(tuple(TreeRec, { TreeRec, Leaf, Node })))
  })
})

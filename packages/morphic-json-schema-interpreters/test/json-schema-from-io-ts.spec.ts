import * as chai from 'chai'
import { right, left } from 'fp-ts/Either'
import { either } from 'fp-ts/Either'
import { JsonSchemaErrors } from '../src/json-schema/json-schema-ctors'
import { of } from 'fp-ts/NonEmptyArray'
import { tuple } from 'fp-ts/function'
import type { JSONSchema } from '../src/json-schema/json-schema'
import { summonFor, UM } from './summoner.spec'

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

const { summon } = summonFor<{}>({})

describe('a json schema generator', function (this: any) {
  it('generate an interface from a io-ts interface', () => {
    const Morph = summon(F =>
      F.interface(
        {
          toto: F.number()
        },
        'Toto'
      )
    )

    const schema = Morph.jsonSchema

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
    const Morph = summon(F =>
      F.partial(
        {
          toto: F.number()
        },
        'Toto'
      )
    )

    const schema = Morph.jsonSchema

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
    const Morph = summon(F =>
      F.intersection(
        [F.partial({ toto: F.number() }, 'Toto'), F.interface({ tata: F.number() }, 'Tata')],
        'TotoAndTata'
      )
    )

    const schema = Morph.jsonSchema

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

  it('generate an interface from both', () => {
    const Morph = summon(F => F.both({ tata: F.number() }, { toto: F.number() }, 'TotoAndTata'))

    const schema = Morph.jsonSchema

    const TotoAndTata: JSONSchema = {
      required: ['tata'],
      properties: {
        toto: { type: 'number' as const },
        tata: { type: 'number' as const }
      },
      type: 'object' as const
    }

    chai.assert.deepStrictEqual(schema, right(tuple(TotoAndTata, { TotoAndTata })))
  })

  it('generate from a complex type', () => {
    const Morph = summon(F => F.interface({ arr: F.array(F.interface({ x: F.string() }, 'X')) }, 'Arrs'))
    const schema = Morph.jsonSchema

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
    const Morph = summon(F =>
      F.intersection([F.interface({ a: F.string() }, 'A'), F.interface({ b: F.number() }, 'B')], 'AB')
    )

    const schema = Morph.jsonSchema

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
    const Morph = summon(F => F.interface({ a: F.nullable(F.string()), b: F.string() }, 'AB'))

    const schema = Morph.jsonSchema

    const AB: JSONSchema = {
      properties: { a: { type: 'string' as const }, b: { type: 'string' as const } },
      required: ['b'],
      type: 'object' as const
    }

    chai.assert.deepStrictEqual(schema, right(tuple(AB, { AB })))
  })

  it('does not work with OptionFromNullable in Array!', () => {
    const Morph = summon(F => F.interface({ as: F.array(F.nullable(F.string())) }, 'AS'))

    const schema = () => Morph.jsonSchema

    chai.assert.deepStrictEqual(
      either.mapLeft(schema(), v => v),
      left(of(JsonSchemaErrors.ArrayConsumesNoOptional))
    )
  })

  it('works for LiteralType', () => {
    const Morph = summon(F => F.interface({ type: F.stringLiteral('toto') }, 'Toto'))

    const schema = Morph.jsonSchema

    const Toto: JSONSchema = {
      properties: { type: { type: 'string' as const, enum: ['toto'] } },
      required: ['type'],
      type: 'object' as const
    }

    chai.assert.deepStrictEqual(schema, right(tuple(Toto, { Toto })))
  })

  it('encodes anonymous KeyOfType inplace ', () => {
    const Morph = summon(F =>
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

    const schema = Morph.jsonSchema

    chai.assert.deepStrictEqual(schema, right(tuple(Toto, { Toto })))
  })

  it('encodes names with KeyOfType ', () => {
    const Morph = summon(F =>
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

    const schema = Morph.jsonSchema

    chai.assert.deepStrictEqual(schema, right(tuple(Toto, { Toto })))
  })

  it('handles generic recursive types', () => {
    const getTree = <A>(LeafValue: UM<{}, A>): UM<{}, GTree<A>> =>
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

  it('uuid', () => {
    const { jsonSchema } = summon(F => F.uuid())
    const UUID: JSONSchema = {
      type: 'string' as const,
      format: 'uuid'
    }
    chai.assert.deepStrictEqual(jsonSchema, right(tuple(UUID, {})))
  })

  it('either', () => {
    const { jsonSchema } = summon(F => F.either(F.string(), F.number()))

    const LeftL: JSONSchema = {
      properties: {
        _tag: {
          enum: ['Left'],
          type: 'string'
        },
        left: {
          type: 'string'
        }
      },
      required: ['_tag', 'left'],
      type: 'object'
    }

    const RightR: JSONSchema = {
      properties: {
        _tag: {
          enum: ['Right'],
          type: 'string'
        },
        right: {
          type: 'number'
        }
      },
      required: ['_tag', 'right'],
      type: 'object'
    }

    const EitherLR: JSONSchema = {
      oneOf: [LeftL, RightR],
      type: 'object'
    }

    chai.assert.deepStrictEqual(jsonSchema, right(tuple(EitherLR, {})))
  })

  it('option', () => {
    const { jsonSchema } = summon(F => F.option(F.string()))

    const None: JSONSchema = {
      properties: {
        _tag: {
          enum: ['None'],
          type: 'string'
        }
      },
      required: ['_tag'],
      type: 'object'
    }

    const SomeStr: JSONSchema = {
      properties: {
        _tag: {
          enum: ['Some'],
          type: 'string'
        },
        value: {
          type: 'string'
        }
      },
      required: ['_tag', 'value'],
      type: 'object'
    }

    const OptionStr: JSONSchema = {
      oneOf: [None, SomeStr],
      type: 'object'
    }

    chai.assert.deepStrictEqual(jsonSchema, right(tuple(OptionStr, {})))
  })
})

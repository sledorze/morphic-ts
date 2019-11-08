import * as chai from 'chai'
import { summon } from '../../../src/utils/summoner'

describe('a json schema generator', function(this: any) {
  it('generate an interface from a io-ts interface', () => {
    const decoder = summon(F =>
      F.interface({
        toto: F.number
      })
    )

    const schema = decoder.jsonSchema

    chai.expect(schema).to.deep.equal({
      required: ['toto'],

      properties: {
        toto: {
          type: 'number'
        }
      },
      type: 'object'
    })
  })

  it('generate an interface from a partial', () => {
    const decoder = summon(F =>
      F.partial({
        toto: F.number
      })
    )

    const schema = decoder.jsonSchema

    chai.expect(schema).to.deep.equal({
      properties: {
        toto: {
          type: 'number'
        }
      },
      type: 'object'
    })
  })

  it('generate an interface from an intersection', () => {
    const decoder = summon(F =>
      F.intersection([
        F.partial({
          toto: F.number
        }),
        F.interface({
          tata: F.number
        })
      ])
    )

    const schema = decoder.jsonSchema

    chai.expect(schema).to.deep.equal({
      required: ['tata'],
      properties: {
        toto: {
          type: 'number'
        },
        tata: {
          type: 'number'
        }
      },
      type: 'object'
    })
  })

  it('generate from a complex type', () => {
    const decoder = summon(F =>
      F.interface({
        arr: F.array(
          F.interface({
            x: F.string
          })
        )
      })
    )
    const schema = decoder.jsonSchema

    chai.expect(schema).to.deep.equal({
      type: 'object',
      required: ['arr'],

      properties: {
        arr: {
          type: 'array',
          items: {
            type: 'object',

            properties: {
              x: {
                type: 'string'
              }
            },
            required: ['x']
          }
        }
      }
    })
  })

  // it('generate primitives datetime from jsjoda', () => {
  //   const decoder = summon(F =>
  //     F.partial({
  //       dateTime: ZonedDateTimeFromString
  //     })
  //   )

  //   const schema = toExtendedJsonSchema([])(decoder, x => {
  //     switch (x._tag) {
  //       case 'ZonedDateTime':
  //         return either.right<Error, JSONSchema>({
  //           type: 'string',
  //           format: 'date-time'
  //         })
  //       default:
  //         return either.left(new Error(`unhandled tag ${x._tag}`))
  //     }
  //     //      return either.left(new Error(`unhandled tag ${x._tag}`))
  //   })

  //   chai.expect(schema).to.deep.equal(
  //     {
  //
  //       properties: {
  //         dateTime: {
  //           type: 'string',
  //           format: 'date-time'
  //         }
  //       },
  //       required: ['dateTime'],
  //       type: 'object'
  //     })
  //   )
  // })

  it('use name as description for intersection', () => {
    const decoder = summon(F =>
      F.intersection(
        [
          F.interface({
            a: F.string
          }),
          F.interface({
            b: F.number
          })
        ]
        // 'Toto'
      )
    )

    const schema = decoder.jsonSchema

    chai.expect(schema).to.deep.equal({
      properties: {
        a: {
          type: 'string'
        },
        b: {
          type: 'number'
        }
      },
      required: ['a', 'b'],
      type: 'object'
    })
  })

  it('use underlying names as description for unnamed intersection', () => {
    const decoder = summon(F =>
      F.intersection([
        F.interface(
          {
            a: F.string
          }
          // 'Toto'
        ),
        F.interface(
          {
            b: F.number
          }
          // 'Tata'
        )
      ])
    )

    const schema = decoder.jsonSchema

    chai.expect(schema).to.deep.equal({
      properties: {
        a: {
          type: 'string'
        },
        b: {
          type: 'number'
        }
      },
      required: ['a', 'b'],
      type: 'object'
    })
  })

  it('use underlying name as description for unnamed intersection', () => {
    const decoder = summon(F =>
      F.intersection([
        F.interface(
          {
            a: F.string
          }
          // 'Toto'
        ),
        F.interface({
          b: F.number
        })
      ])
    )

    const schema = decoder.jsonSchema

    chai.expect(schema).to.deep.equal({
      properties: {
        a: {
          type: 'string'
        },
        b: {
          type: 'number'
        }
      },
      required: ['a', 'b'],
      type: 'object'
    })
  })

  it('works with OptionFromNullable!', () => {
    const decoder = summon(F =>
      F.interface(
        {
          a: F.nullable(F.string),
          b: F.string
        }
        // 'Toto'
      )
    )

    const schema = decoder.jsonSchema

    chai.expect(schema).to.deep.equal({
      properties: {
        a: {
          type: 'string'
        },
        b: {
          type: 'string'
        }
      },
      required: ['b'],
      type: 'object'
    })
  })

  it('does not work with OptionFromNullable in Array!', () => {
    const decoder = summon(F =>
      F.interface({
        as: F.array(F.nullable(F.string))
      })
    )

    const schema = () => decoder.jsonSchema

    chai.expect(schema).to.throw()
  })

  it('works for LiteralType', () => {
    const decoder = summon(F =>
      F.interface(
        {
          type: F.stringLiteral('toto')
        }
        // 'Toto'
      )
    )

    const schema = decoder.jsonSchema

    chai.expect(schema).to.deep.equal({
      properties: {
        type: {
          type: 'string',
          enum: ['toto']
        }
      },
      required: ['type'],
      type: 'object'
    })
  })

  it('encodes anonymous KeyOfType inplace ', () => {
    const decoder = summon(F =>
      F.interface(
        {
          type: F.keysOf({
            toto: null,
            tutu: null
          })
        }
        // 'Toto'
      )
    )

    const schema = decoder.jsonSchema

    chai.expect(schema).to.deep.equal({
      properties: {
        type: {
          type: 'string',
          enum: ['toto', 'tutu']
        }
      },
      required: ['type'],
      type: 'object'
    })
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
        }
        // 'Toto'
      )
    )

    const schema = decoder.jsonSchema

    chai.expect(schema).to.deep.equal({
      properties: {
        type: {
          type: 'string',

          enum: ['toto', 'tutu']
        }
      },
      required: ['type'],
      type: 'object'
    })
  })
})

// describe('Opaque', () => {
//   it("should expose a 'x-scala-type'", () => {
//     interface Foo extends OpaqueTagged<string, 'TotoTagType'> {}
//     const Foo: OpaqueWithTC<Foo> = opaqueOfString('TotoTagType')

//     interface Bar extends OpaqueTagged<number, 'BarTagType'> {}
//     const Bar: OpaqueWithTC<Bar> = opaqueOfNumber('BarTagType')

//     const Type = asMixed(
//       F.interface({
//         foo: Foo.Type,
//         bar: Bar.Type
//       })
//     )

//     const schema = toExtendedJsonSchema([])(Type as any, x => either.left(new Error(`unhandled tag ${x._tag}`)))

//     chai.expect(schema).to.deep.equal(
//       {
//
//         properties: {
//           foo: {
//             type: 'string',
//             'x-scala-type': 'String @@ TotoTagType'
//           },
//           bar: {
//             type: 'number',
//             'x-scala-type': 'BigDecimal @@ BarTagType'
//           }
//         },
//         required: ['foo', 'bar'],
//         type: 'object'
//       })
//     )
//   })
// })

import * as chai from 'chai'
import { summon } from '@morphic-ts/batteries/lib/summoner-G'
import { GraphQLSchema, GraphQLObjectType, printSchema } from 'graphql'

describe('Graphql', () => {
  it('interface', () => {
    const Name = summon(F => F.string())
    const SurName = summon(F => F.nullable(F.string()))
    const Person = summon(F =>
      F.interface(
        {
          name: Name(F),
          surname: SurName(F)
        },
        'Person'
      )
    )

    const schema = new GraphQLSchema({
      query: new GraphQLObjectType({
        name: 'Query',
        fields: {
          person: {
            type: Person.schema
          }
        }
      })
    })

    chai.assert.strictEqual(
      printSchema(schema).replace(new RegExp('\n', 'g'), ''),
      ['type Person {', '  name: String!', '  surname: String', '}', 'type Query {', '  person: Person!', '}'].join('')
    )
  })

  it('partial', () => {
    const Name = summon(F => F.string())
    const SurName = summon(F => F.nullable(F.string()))
    const Person = summon(F =>
      F.partial(
        {
          name: Name(F),
          surname: SurName(F)
        },
        'Person'
      )
    )

    const schema = new GraphQLSchema({
      query: new GraphQLObjectType({
        name: 'Query',
        fields: {
          person: {
            type: Person.schema
          }
        }
      })
    })

    chai.assert.strictEqual(
      printSchema(schema).replace(new RegExp('\n', 'g'), ''),
      ['type Person {', '  name: String', '  surname: String', '}', 'type Query {', '  person: Person!', '}'].join('')
    )
  })
})

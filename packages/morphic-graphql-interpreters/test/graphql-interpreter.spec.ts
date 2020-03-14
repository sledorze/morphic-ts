import * as chai from 'chai'
import { summon } from '@morphic-ts/batteries/lib/summoner-G'
import { GraphQLSchema, GraphQLObjectType, printSchema } from 'graphql'

describe('Graphql', () => {
  it('string', () => {
    const s = summon(F => F.string())
    const schema = new GraphQLSchema({
      query: new GraphQLObjectType({
        name: 'Query',
        fields: {
          s: {
            type: s.schema
          }
        }
      })
    })

    chai.assert.strictEqual(
      printSchema(schema).replace(new RegExp('\n', 'g'), ''),
      ['type Query {', '  s: String!', '}'].join('')
    )
  })

  it('interface', () => {
    const s = summon(F =>
      F.interface(
        {
          name: F.string(),
          surname: F.string()
        },
        'Person'
      )
    )

    const schema = new GraphQLSchema({
      query: new GraphQLObjectType({
        name: 'Query',
        fields: {
          s: {
            type: s.schema
          }
        }
      })
    })

    chai.assert.strictEqual(
      printSchema(schema).replace(new RegExp('\n', 'g'), ''),
      ['type Person {', '  name: String!', '  surname: String!', '}', 'type Query {', '  s: Person!', '}'].join('')
    )
  })
})

import { ModelAlgebraPrimitive1 } from '@morphic-ts/model-algebras/lib/primitives'
import { GraphqlType, GraphqlURI } from '../hkt'
import { GraphQLString, GraphQLBoolean, GraphQLFloat, GraphQLList, GraphQLNonNull } from 'graphql'

/**
 *  @since 0.0.1
 */
export const graphqlPrimitiveInterpreter: ModelAlgebraPrimitive1<GraphqlURI> = {
  _F: GraphqlURI,
  date: _ => new GraphqlType({ nullable: false, type: GraphQLString }),
  boolean: _ => new GraphqlType({ nullable: false, type: GraphQLBoolean }),
  string: _ => new GraphqlType({ nullable: false, type: GraphQLString }),
  number: _ => new GraphqlType({ nullable: false, type: GraphQLFloat }),
  bigint: _ => new GraphqlType({ nullable: false, type: GraphQLString }),
  stringLiteral: <T extends string>(_: T) => new GraphqlType<T>({ nullable: false, type: GraphQLString }),
  keysOf: _ => new GraphqlType({ nullable: false, type: GraphQLString }),
  nullable: ({ graphql: { type } }) => new GraphqlType({ nullable: true, type }),
  array: ({ graphql: { type, nullable } }) =>
    new GraphqlType({ nullable: false, type: new GraphQLList(nullable ? type : new GraphQLNonNull(type)) })
}

import { ModelAlgebraObject1 } from '@morphic-ts/model-algebras/lib/object'
import { GraphqlType, GraphqlURI } from '../hkt'
import { projectField } from '@morphic-ts/common/lib/utils'
import { GraphQLObjectType, GraphQLNonNull } from 'graphql'
import { record } from 'fp-ts/lib/Record'

/**
 *  @since 0.0.1
 */
export const graphqlObjectInterpreter: ModelAlgebraObject1<GraphqlURI> = {
  _F: GraphqlURI,
  interface: (props, name) =>
    new GraphqlType({
      nullable: false,
      type: new GraphQLObjectType({
        name,
        fields: record.map(projectField(props)('graphql'), (x: GraphqlType<any>['graphql']) => ({
          type: x.nullable ? x.type : new GraphQLNonNull(x.type)
        })) as any
      })
    }),
  partial: (props, name) =>
    new GraphqlType({
      nullable: false,
      type: new GraphQLObjectType({
        name,
        fields: record.map(projectField(props)('graphql'), (x: GraphqlType<any>['graphql']) => ({
          type: x.type
        })) as any
      })
    })
}

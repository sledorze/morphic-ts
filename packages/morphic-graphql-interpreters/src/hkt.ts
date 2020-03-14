import { GraphQLOutputType } from 'graphql'

/**
 *  @since 0.0.1
 */
export const GraphqlURI = 'GraphqlURI' as const
/**
 *  @since 0.0.1
 */
export type GraphqlURI = typeof GraphqlURI

/**
 *  @since 0.0.1
 */
export class GraphqlType<A> {
  _A!: A
  _URI!: GraphqlURI
  constructor(
    public graphql: {
      nullable: boolean
      type: GraphQLOutputType
    }
  ) {}
}

declare module '@morphic-ts/common/lib/HKT' {
  interface URItoKind<A> {
    [GraphqlURI]: GraphqlType<A>
  }
}

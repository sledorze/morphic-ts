export const URI = 'Dummy'
export type URI = typeof URI

export class DummyType<A> {
  constructor() {}
}

declare module '../HKT' {
  interface URItoKind<A> {
    [URI]: DummyType<A>
  }
}

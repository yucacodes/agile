
export abstract class Model<P> {
  protected readonly props: P

  constructor(props: P) {
    this.props = props
  }

  abstract validate(): void
}

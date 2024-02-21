export abstract class Model<P extends {}> {
  protected readonly props: P

  constructor(props: P) {
    this.props = props
  }
}

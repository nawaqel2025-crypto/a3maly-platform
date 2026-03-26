export abstract class ValueObject<TProps> {
  constructor(public readonly props: TProps) {}
}

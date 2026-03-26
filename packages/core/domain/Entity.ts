export abstract class Entity<TProps> {
  constructor(
    public readonly id: string,
    public props: TProps
  ) {}
}

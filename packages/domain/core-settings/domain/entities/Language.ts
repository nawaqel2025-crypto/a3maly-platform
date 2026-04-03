export class Language {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly code: string,
    public readonly isDefault: boolean,
    public readonly isActive: boolean
  ) {}

  static create(props: {
    id: string;
    name: string;
    code: string;
    isDefault?: boolean;
    isActive?: boolean;
  }) {
    if (!props.code.match(/^[a-z]{2}$/i)) {
      throw new Error("Invalid language code");
    }

    return new Language(
      props.id,
      props.name,
      props.code,
      props.isDefault ?? false,
      props.isActive ?? true
    );
  }
}

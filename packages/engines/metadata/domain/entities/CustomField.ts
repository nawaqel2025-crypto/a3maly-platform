import { Entity } from '../../../../core/domain/Entity';

interface CustomFieldProps {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: any;
}

export class CustomField extends Entity<CustomFieldProps> {
  static create(props: CustomFieldProps, id: string) {
    return new CustomField(id, props);
  }
}

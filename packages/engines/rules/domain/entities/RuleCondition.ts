import { Entity } from '../../../../core/domain/Entity';

interface RuleConditionProps {
  field: string;
  operator: string;
  value: any;
}

export class RuleCondition extends Entity<RuleConditionProps> {
  static create(props: RuleConditionProps, id: string) {
    return new RuleCondition(id, props);
  }
}

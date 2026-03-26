import { Entity } from '../../../../core/domain/Entity';

interface RuleProps {
  name: string;
  conditions: string[];
  action: string;
}

export class Rule extends Entity<RuleProps> {
  static create(props: RuleProps, id: string) {
    return new Rule(id, props);
  }
}

import { Entity } from '../../../../core/domain/Entity';

interface WorkflowDefinitionProps {
  name: string;
  steps: string[];
}

export class WorkflowDefinition extends Entity<WorkflowDefinitionProps> {
  static create(props: WorkflowDefinitionProps, id: string) {
    return new WorkflowDefinition(id, props);
  }
}

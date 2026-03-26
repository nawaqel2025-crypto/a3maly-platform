import { Entity } from '../../../../core/domain/Entity';

interface WorkflowStepProps {
  workflowId: string;
  order: number;
  approverRole: string;
}

export class WorkflowStep extends Entity<WorkflowStepProps> {
  static create(props: WorkflowStepProps, id: string) {
    return new WorkflowStep(id, props);
  }
}

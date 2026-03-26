import { AggregateRoot } from '../../../../core/domain/AggregateRoot';

interface WorkflowInstanceProps {
  workflowId: string;
  currentStep: number;
  status: string;
}

export class WorkflowInstance extends AggregateRoot<WorkflowInstanceProps> {
  static create(props: WorkflowInstanceProps, id: string) {
    return new WorkflowInstance(id, props);
  }
}

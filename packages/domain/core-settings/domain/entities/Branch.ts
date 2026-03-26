import { Entity } from '../../../../core/domain/Entity';

interface BranchProps {
  companyId: string;
  name: string;
  code: string;
  isActive: boolean;
}

export class Branch extends Entity<BranchProps> {
  static create(props: BranchProps, id: string) {
    return new Branch(id, props);
  }
}

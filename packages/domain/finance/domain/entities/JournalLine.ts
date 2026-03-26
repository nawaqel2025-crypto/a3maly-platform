import { Entity } from '../../../../core/domain/Entity';

interface JournalLineProps {
  accountId: string;
  debit: number;
  credit: number;
}

export class JournalLine extends Entity<JournalLineProps> {
  static create(props: JournalLineProps, id: string) {
    return new JournalLine(id, props);
  }
}

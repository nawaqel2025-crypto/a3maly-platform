import { AggregateRoot } from '../../../../core/domain/AggregateRoot';

interface JournalEntryProps {
  date: Date;
  description: string;
  lines: any[];
}

export class JournalEntry extends AggregateRoot<JournalEntryProps> {
  static create(props: JournalEntryProps, id: string) {
    return new JournalEntry(id, props);
  }
}

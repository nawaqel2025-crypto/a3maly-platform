import { Entity } from '../../../../core/domain/Entity';

interface PostingResultProps {
  journalEntryId: string;
  success: boolean;
}

export class PostingResult extends Entity<PostingResultProps> {
  static create(props: PostingResultProps, id: string) {
    return new PostingResult(id, props);
  }
}

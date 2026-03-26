import { Entity } from '../../../../core/domain/Entity';

interface PostingRuleProps {
  source: string;
  debitAccount: string;
  creditAccount: string;
  condition?: string;
}

export class PostingRule extends Entity<PostingRuleProps> {
  static create(props: PostingRuleProps, id: string) {
    return new PostingRule(id, props);
  }
}

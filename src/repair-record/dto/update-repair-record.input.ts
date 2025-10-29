import { CreateRepairRecordInput } from './create-repair-record.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRepairRecordInput extends PartialType(CreateRepairRecordInput) {
  @Field()
  id: string;
}

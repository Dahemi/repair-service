import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateRepairRecordInput {
  @Field()
  vin: string;

  @Field()
  repair_description: string;

  @Field(() => Float)
  repair_cost: number;

  @Field({ nullable:true})
  mechanic_name?: string;

  @Field({ nullable:true})
  status?: string;

}

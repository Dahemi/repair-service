import { ObjectType, Field, Directive } from '@nestjs/graphql';
import { RepairRecord } from './repair-record.entity';

@ObjectType()
@Directive('@key(fields: "vin")') // this must match one of @Key fields in vehicle entity
@Directive('@extends')
export class Vehicle {
  @Field()
  @Directive('@external')
  vin: string;

  @Field(() =>[RepairRecord])
  repairRecords?: RepairRecord[];
}


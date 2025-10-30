import { ObjectType, Field, Directive } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "vin")') // this must match one of @Key fields in vehicle entity
@Directive('@extends')
export class Vehicle {
  @Field()
  @Directive('@external')
  vin: string;
}

// should contain only the fields necessary to reference it
// act as an instruction manual for the gateway
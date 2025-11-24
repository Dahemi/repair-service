import { ObjectType, Field,ID, Float, Directive } from '@nestjs/graphql';
import { Entity,PrimaryGeneratedColumn,Column, CreateDateColumn,UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity()
export class RepairRecord {

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  vin: string; // Links to Vehicle entity via VIN

  @Field()
  @Column()
  repair_description: string;

  @Field(() => Float)
  @Column('decimal', {precision:10, scale:2})
  repair_cost: number;

  @Field()
  @Column({ default: 'pending'})
  status: string;

  @Field({ nullable:true})
  @Column({ nullable:true})
  mechanic_name: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;

}

/**
 * repair_cost uses decimal in DB and is typed as number in TS. 
 * With TypeORM, decimal values are often returned as string to avoid precision loss. 
 * Ensure conversion or use transformer to make GraphQL expose a Float
 */

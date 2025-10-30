import { ObjectType, Field,ID, Float, Directive } from '@nestjs/graphql';
import { Entity,PrimaryGeneratedColumn,Column, CreateDateColumn,UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity()
@Directive('@key(fields: "id")')
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

import { ObjectType, Field,ID, Float } from '@nestjs/graphql';
import { Entity,PrimaryGeneratedColumn,Column, CreateDateColumn,UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity()
export class RepairRecord {

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  vin: string;

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

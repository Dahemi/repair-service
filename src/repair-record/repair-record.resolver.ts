import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RepairRecordService } from './repair-record.service';
import { RepairRecord } from './entities/repair-record.entity';
import { CreateRepairRecordInput } from './dto/create-repair-record.input';
import { UpdateRepairRecordInput } from './dto/update-repair-record.input';

@Resolver(() => RepairRecord)
export class RepairRecordResolver {
  constructor(private readonly repairRecordService: RepairRecordService) {}

  @Query(() => [RepairRecord], { name: 'findAllRepairRecords' })
  findAll() {
    return this.repairRecordService.findAll();
  }

  @Query(() => [RepairRecord], { name: 'findRepairRecordByVIN' })
  findByVIN(@Args('vin') vin: string): Promise<RepairRecord[]> {
    return this.repairRecordService.findByVIN(vin);
  }

  @Mutation(() => RepairRecord)
  createRepairRecord(
    @Args('createRepairRecordInput') createRepairRecordInput: CreateRepairRecordInput
  ): Promise<RepairRecord> {
    return this.repairRecordService.create(createRepairRecordInput);
  }
}

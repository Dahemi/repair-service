import { Resolver, Query, Mutation, Args, Int, ResolveReference } from '@nestjs/graphql';
import { RepairRecordService } from './repair-record.service';
import { RepairRecord } from './entities/repair-record.entity';
import { CreateRepairRecordInput } from './dto/create-repair-record.input';
import { UpdateRepairRecordInput } from './dto/update-repair-record.input';
import {Vehicle } from './entities/vehicle.entity';
import { ResolveField, Parent } from '@nestjs/graphql';

@Resolver(() => RepairRecord)
export class RepairRecordResolver {
  constructor(private readonly repairRecordService: RepairRecordService) {}

  @Query(() => [RepairRecord], { name: 'findAllRepairRecords' })
  findAll(): Promise<RepairRecord[]> {
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

  @Query(() => [String], { name: 'findAllRepairVINs' })
  findAllVINs(): Promise<string[]> {
    return this.repairRecordService.findAllVINs();
  }

}

@Resolver(() => Vehicle)
export class VehicleRepairResolver{
  constructor(private readonly repairRecordService: RepairRecordService){}

  @ResolveField(() => [RepairRecord])
  async repairRecords(@Parent() vehicle: Vehicle): Promise<RepairRecord[]> {
    return this.repairRecordService.findByVIN(vehicle.vin);
  }

  @ResolveReference()
  resolveReference(reference: { vin: string }): Vehicle {
    return { vin: reference.vin } as unknown as Vehicle;
  }
}

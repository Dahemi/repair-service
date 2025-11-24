import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RepairRecordService } from './repair-record.service';
import { RepairRecord } from './entities/repair-record.entity';
import { CreateRepairRecordInput } from './dto/create-repair-record.input';
import {Vehicle } from './entities/vehicle.entity';
import { ResolveField, Parent } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';

@Resolver(() => RepairRecord)
export class RepairRecordResolver {
  private readonly logger = new Logger(RepairRecordResolver.name);

  constructor(private readonly repairRecordService: RepairRecordService) {}

  @Query(() => [RepairRecord], { name: 'findAllRepairRecords' })
  async findAll(): Promise<RepairRecord[]> {
    const records = await this.repairRecordService.findAll();
    return records;
  }


  @Query(() => [RepairRecord], { name: 'findRepairRecordByVIN' })
  async findByVIN(@Args('vin') vin: string): Promise<RepairRecord[]> {

    if(!vin || vin.trim().length === 0){
      this.logger.error('Repair service - Empty VIN provided');
      throw new Error('VIN cannot be empty');
    }

    const records = await this.repairRecordService.findByVIN(vin);
    return records;
  }


  @Mutation(() => RepairRecord)
  async createRepairRecord(
    @Args('createRepairRecordInput') createRepairRecordInput: CreateRepairRecordInput
  ): Promise<RepairRecord> {

    if (!createRepairRecordInput.vin || createRepairRecordInput.vin.trim().length === 0){
      this.logger.error('Repair service - VIN is required');
      throw new Error('VIN is required');
    }

    if (createRepairRecordInput.repair_cost < 0){
      this.logger.error('Repair service - Invalid repair cost');
      throw new Error('Repair cost must be greater than 0');
    }

    const record = await this.repairRecordService.create(createRepairRecordInput);
    return record;
  }


  @Query(() => [String], { name: 'findAllRepairVINs' })
  async findAllVINs(): Promise<string[]> {
    const vins = await this.repairRecordService.findAllVINs();
    return vins;
  }

}


@Resolver(() => Vehicle)
export class VehicleRepairResolver{
  private readonly logger = new Logger(VehicleRepairResolver.name);

  constructor(private readonly repairRecordService: RepairRecordService){}

  @ResolveField(() => [RepairRecord])
  async repairRecords(@Parent() vehicle: Vehicle): Promise<RepairRecord[]> {
    this.logger.log('Federation: ResolverField called for Vehcile.repairRecords');
    this.logger.log(`Federation: Parent Vehicle VIN: ${vehicle.vin}`);

    if (!vehicle.vin){
      this.logger.error('Federation: No VIN in parent vehicle object');
      throw new Error('VIN is required to detch repair records');
    }

    const records = await this.repairRecordService.findByVIN(vehicle.vin);
    return records;
  }

}

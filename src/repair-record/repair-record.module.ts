import { Module } from '@nestjs/common';
import { RepairRecordService } from './repair-record.service';
import { RepairRecordResolver } from './repair-record.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepairRecord } from './entities/repair-record.entity';
import { VehicleRepairResolver } from './repair-record.resolver';


@Module({
  imports:[
    TypeOrmModule.forFeature([RepairRecord])
  ],
  providers: [RepairRecordResolver, RepairRecordService, VehicleRepairResolver],
  exports:[RepairRecordService]
})
export class RepairRecordModule {}

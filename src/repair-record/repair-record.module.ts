import { Module } from '@nestjs/common';
import { RepairRecordService } from './repair-record.service';
import { RepairRecordResolver } from './repair-record.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepairRecord } from './entities/repair-record.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([RepairRecord])
  ],
  providers: [RepairRecordResolver, RepairRecordService],
  exports:[RepairRecordService]
})
export class RepairRecordModule {}

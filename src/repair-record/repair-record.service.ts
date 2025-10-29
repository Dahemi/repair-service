import { Injectable } from '@nestjs/common';
import { CreateRepairRecordInput } from './dto/create-repair-record.input';
import { UpdateRepairRecordInput } from './dto/update-repair-record.input';
import { InjectRepository } from '@nestjs/typeorm';
import { RepairRecord } from './entities/repair-record.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RepairRecordService {

  constructor(
    @InjectRepository(RepairRecord)
    private repairRepository: Repository<RepairRecord>,
  ){}


  findAll() : Promise<RepairRecord[]> {
    return this.repairRepository.find({
      order:{
        created_at: 'DESC'
      }
    })
  }

  findByVIN(vin: string): Promise<RepairRecord[]> {
    return this.repairRepository.find({
      where:{vin}
    })
  }

  create(createRepairRecordInput: CreateRepairRecordInput) : Promise<RepairRecord>{
    const newRepairRecord = this.repairRepository.create(createRepairRecordInput);
    return this.repairRepository.save(newRepairRecord);
  }
  
}

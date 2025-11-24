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

  async findAll() : Promise<RepairRecord[]> {
    const records = await this.repairRepository.find();
    return records;
  }

  async findByVIN(vin: string): Promise<RepairRecord[]> {
    const records = await this.repairRepository.find({where:{vin}});
    return records;
  }

  async findAllVINs(): Promise<string[]> {
    const result = await this.repairRepository
      .createQueryBuilder('repair')
      .select('DISTINCT repair.vin', 'vin')
      .getRawMany();
    
    const vins = result.map(item => item.vin);
    return vins;
  }
  
  async create(createRepairRecordInput: Partial<RepairRecord>) : Promise<RepairRecord>{
    const newRepairRecord = this.repairRepository.create(createRepairRecordInput);
    const saved = await this.repairRepository.save(newRepairRecord);
    return saved;
  }
  
}

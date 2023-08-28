import { Module } from '@nestjs/common';
import { CompanySectorService } from './company-sector.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CompanySector,
  CompanySectorSchema,
} from './entities/company-sector.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CompanySector.name, schema: CompanySectorSchema },
    ]),
  ],
  providers: [CompanySectorService],
  exports: [CompanySectorService],
})
export class CompanySectorModule {}

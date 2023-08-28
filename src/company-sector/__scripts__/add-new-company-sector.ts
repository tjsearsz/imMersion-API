import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module.js';
import { CompanySectorService } from '../company-sector.service.js';

const appContext = await NestFactory.createApplicationContext(AppModule);

const companySectorService =
  appContext.get<CompanySectorService>(CompanySectorService);

console.info('Inserting new company sector');

const result = await companySectorService.create({
  title: 'Music',
  imageModel: {
    url: 'https://cdn.filestackcontent.com/JVo8paRQiYTHAxqsV5XQ',
    size: 6574824,
    type: 'image/png',
    filename: 'temp.png',
  },
});

console.info('success: ', result);

appContext.close();

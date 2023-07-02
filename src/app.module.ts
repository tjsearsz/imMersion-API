import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AugmentedImageModule } from './augmented-image/augmented-image.module.js';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
    }),
    AugmentedImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

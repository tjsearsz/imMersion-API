import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UserModule } from './user/user.module.js';
import { CompanyModule } from './company/company.module.js';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
    }),
    UserModule,
    CompanyModule,
    MongooseModule.forRoot(
      'mongodb+srv://tjsearszu:ExUWi56OgBKP2Kzu@immersion-1.avndzry.mongodb.net/?retryWrites=true&w=majority',
    ), // TODO: Add the credentials in a better place
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UserModule } from './user/user.module.js';
import { CompanyModule } from './company/company.module.js';
import { AuthModule } from './auth/auth.module.js';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';
import { BranchModule } from './branch/branch.module.js';
import { JobModule } from './job/job.module.js';
import { AugmentedImageModule } from './augmented-image/augmented-image.module.js';

//TODO: cleanup code resolvers, methods etc that are not used

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
    }),
    UserModule,
    CompanyModule,
    BranchModule,
    JobModule,
    AugmentedImageModule, //TODO: REMOVE THIS SINCE IT WILL NOT BE NEEDED
    MongooseModule.forRoot(
      'mongodb+srv://tjsearszu:ExUWi56OgBKP2Kzu@immersion-1.avndzry.mongodb.net/?retryWrites=true&w=majority',
      {
        connectionFactory: (connection) => {
          connection.plugin(mongooseLeanVirtuals);
          return connection;
        },
      },
    ),
    AuthModule, // TODO: Add the credentials in a better place
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

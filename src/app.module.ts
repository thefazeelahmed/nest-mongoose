import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { getEnvPath } from 'common/helper/env.helper';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
    }),

    MongooseModule.forRoot(
      'mongodb+srv://irfazeel:nokia420@cluster0.mvtgqoo.mongodb.net/nest-boilerplate?retryWrites=true&w=majority',
    ),

    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

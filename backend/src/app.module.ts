import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'


import { AppController } from './app.controller';
import { AwsModule } from "./aws/module"
import { AuthModule } from "./auth/module"
import { AppService } from './app.service';

@Module({
  imports: [
    AuthModule,
    AwsModule,
    ConfigModule.forRoot({ isGlobal: true })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

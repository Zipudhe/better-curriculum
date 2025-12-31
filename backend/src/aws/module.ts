import { Module } from '@nestjs/common'
import { ConfigModule } from "@nestjs/config"

import { AwsController } from "./controller"
import { AwsService } from "./service"
import awsconfig from "./config/aws"

@Module({
  imports: [ConfigModule.forFeature(awsconfig)],
  controllers: [AwsController],
  providers: [AwsService]
})
export class AwsModule { }

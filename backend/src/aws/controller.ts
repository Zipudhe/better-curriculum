import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common"
import { AwsService } from "./service"

@Controller()
export class AwsController {
  constructor(private readonly awsService: AwsService) { }

  @Get("aws")
  getFile() {
    try {
      return this.awsService.getPdfProfile("Profile.pdf")
    } catch (e) {
      console.error({ e })
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}

import { Injectable, Inject } from "@nestjs/common";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"
import awsConfig from "./config/aws";
import type { ConfigType } from "@nestjs/config";

@Injectable()
export class AwsService {
  private readonly s3Client: S3Client
  constructor(@Inject(awsConfig.KEY) private config: ConfigType<typeof awsConfig>) {
    this.s3Client = new S3Client({
      region: config.region,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey
      }
    })

  }

  async getPdfProfile(file: string) {
    return await this.s3Client.send(
      new GetObjectCommand({
        Bucket: 'zipudhe-stick-figure',
        Key: `curriculum/${file}`
      })
    )
      .catch((error: Error) => {
        console.log({ error })
        throw error.message
      })
      .then(({ Body }) => {
        return Body.transformToByteArray()
      })
      .then((file: Uint8Array) => file)
      .catch(error => {
        console.error({ fileError: error })
        throw new Error("Failed to transform file")
      })

  }
}

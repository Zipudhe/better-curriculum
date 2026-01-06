import type { Route } from "./+types/aws"
import { handleRequest, route, type Router } from '@better-upload/server';
import { aws } from '@better-upload/server/clients';

// TODO: Refactor this to backend

type AwsClientParams = {
  accessKeyId: string,
  secretAccessKey: string,
  region: string,
}

const get_credentials = (): AwsClientParams => {

  const accessKeyId = process.env.REACT_APP_ACCESS_KEY_ID
  const secretAccessKey = process.env.REACT_APP_SECRET_ACCESS_KEY
  const region = process.env.REACT_APP_REGION

  if (!accessKeyId || !secretAccessKey || !region) {
    throw new Error("Must set aws credentials")
  }

  return {
    accessKeyId,
    secretAccessKey,
    region
  }
}

const credentials = get_credentials()
const s3 = aws(credentials);

const router: Router = {
  client: s3,
  bucketName: 'zipudhe-stick-figure',
  routes: {
    curriculum: route({
      fileTypes: ['application/pdf'],
      multipleFiles: false,
      onBeforeUpload: async ({ file }) => {

        return {
          generateObjectInfo: () => ({
            key: `curriculum/${file.name}`,
          }),
          bucketName: 'zipudhe-stick-figure',
        };
      }
    })
  },
};

export async function loader(args: Route.LoaderArgs) {
  console.log({ args: args.request })
  return "Some data"
}

export async function action(args: Route.ActionArgs) {
  return handleRequest(args.request, router)
}

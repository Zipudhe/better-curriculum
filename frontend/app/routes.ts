import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  ...prefix("api", [route("upload", "./api/upload/aws.ts")]
  )
] satisfies RouteConfig;

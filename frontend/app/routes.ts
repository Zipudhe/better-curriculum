import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  layout("./routes/layout.tsx", [
    index("routes/home.tsx"),
    ...prefix("api", [route("upload", "./api/upload/aws.ts")],
    )
  ])
] satisfies RouteConfig;

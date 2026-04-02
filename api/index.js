import { createRequestHandler } from "@remix-run/express";
import express from "express";

const app = express();

app.use(
  "/assets",
  express.static("build/client/assets", { immutable: true, maxAge: "1y" })
);
app.use(express.static("build/client", { maxAge: "1h" }));

app.all(
  "*",
  createRequestHandler({
    build: await import("../build/server/index.js"),
  })
);

export default app;

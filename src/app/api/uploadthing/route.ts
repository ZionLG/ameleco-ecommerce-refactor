import { createRouteHandler } from "uploadthing/next";

import { amelecoFileRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: amelecoFileRouter,
});

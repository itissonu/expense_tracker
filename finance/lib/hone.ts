import { hc } from "hono/client";

import { AppType } from "@/app/api/[[...route]]/route";

export const client=hc<AppType>(process.env.NEXT_PUBLIC_APP_URL!)


// The code imports the hc function from the "hono/client" module. This function is likely used for creating HTTP clients to interact with APIs.


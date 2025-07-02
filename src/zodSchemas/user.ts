import * as z from "zod/v4";

const ExtraUserDetails = z.object({
  twitter: z.string(),
  github: z.string(),
});

export { ExtraUserDetails };

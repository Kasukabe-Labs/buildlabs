import { z } from "zod";

export const VoteSchema = z.object({
  projectId: z.string(),
});

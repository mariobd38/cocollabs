import { z } from "zod";

export const waitlistSchema = z.object({
    email: z.string()
        .min(1, { message: "Email is required." })
});
// src/utils/formSchemas.ts
import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

//full name and username validation
export const profileSchema = z.object({
    fullName: z.string()
        .refine((value) => value.trim().split(/\s+/).length >= 2, {
            message: "Full name must include first and last name.",
        }),
    username: z.string()
        .min(3, {
            message: "Username must be at least 3 characters.",
        })
        .max(40, {
            message: "Username is too long (maximum 40 characters).",
        }),
    avatar: z.any().nullable(),
    image: z.union([
        z.instanceof(File).refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
            message: "Only these types are allowed: .jpg, .jpeg, .png, and .webp",
        }),
        z.null(),
    ]),
    }).refine((data) => data.avatar !== null || data.image !== null,{
        message: "Please select an avatar or image.",
        path: ["avatar"], // ✅ Attach error message to avatar field
    }
);
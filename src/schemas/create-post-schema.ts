import { z } from "zod";

export const CreatePostFormSchema = z.object({
    post_content: z.string().min(1, {
        message: "Post body cannot be empty."
    })
})
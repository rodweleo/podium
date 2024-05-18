import { z } from "zod";

export const SignUpFormSchema = z.object({
    email: z.string().min(8, {
        message: "Email address is too short"
    }),
    password: z.string().min(2, {
        message: "Password is too short"
    })
})
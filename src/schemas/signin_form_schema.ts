import { z } from "zod";

export const SignInFormSchema = z.object({
    email: z.string().min(8, {
        message: "Email address is too short"
    }),
    password: z.string().min(2, {
        message: "Password is too short"
    })
})
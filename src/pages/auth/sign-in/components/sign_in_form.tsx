import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import z from "zod"
import { SignInFormSchema } from "@/schemas/signin_form_schema"
import { zodResolver } from "@hookform/resolvers/zod"
import {Link, useNavigate } from "react-router-dom"
import { UserCredential, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/configs/firebase"
import { useToast } from "@/components/ui/use-toast"
import ClipLoader from "react-spinners/ClipLoader";
import { useState} from "react"

export const SignInForm = () => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const navigate = useNavigate()
    const { toast } = useToast()
    const form = useForm<z.infer<typeof SignInFormSchema>>({
        resolver: zodResolver(SignInFormSchema),
        defaultValues: {
            email: ""
        }
    })

    const onSubmit = (values: z.infer<typeof SignInFormSchema>) =>{
        /*navigate("/feed", {
            replace: true
        })*/
        setIsSubmitting(true)

        signInWithEmailAndPassword(auth, values.email, values.password).then((value: UserCredential) => {
            toast({
                title: "Authentication",
                description: `Welcome back ${value.user.email}.`
            })
            setTimeout(() => {
                navigate("/feed", {
                    replace: true
                })
            }, 1000)
            setIsSubmitting(false)
        }).catch((error) => {
            setIsSubmitting(false)
        })
    } 

    return <Card className="w-[400px]">
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardHeader className="space-y">
        <CardTitle className="text-3xl">Sign In</CardTitle>
        <CardDescription className="font-semibold">
            Enter your email and password to login
        </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                    <Input placeholder="johndoe@gmail.com" {...field} required />
                </FormControl>
                <FormMessage />
                </FormItem>
                
            )}
            />
            <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                    <Input placeholder="********" {...field} required />
                </FormControl>
                <FormMessage />
                </FormItem>
                
            )}
            />
            <Link to="/reset-password" className="text-sm">Forgot Password?</Link>
        </CardContent>
        <CardFooter className="flex flex-col">
            <Button className="w-full flex items-center gap-1">{isSubmitting && <ClipLoader color="white" size={20} />} Sign In</Button>
            <p className="mt-2 text-xs text-center text-gray-700">
                {" "}
                Don't have an account?{" "}
                <Link className=" text-blue-600 hover:underline" to="/sign-up">Sign up</Link>
            </p>
        </CardFooter>
    </form>
    </Form>
    </Card>  
  
}
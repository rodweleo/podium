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
import { SignUpFormSchema } from "@/schemas/signup-form-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { UserCredential, createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "@/firebase/configs/firebase"
import { useToast } from "@/components/ui/use-toast"
import ClipLoader from "react-spinners/ClipLoader";
import { useState} from "react"
import { collection, setDoc, doc, Timestamp } from "firebase/firestore"

export const SignUpForm = () => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const navigate = useNavigate()
    const { toast } = useToast()
    const form = useForm<z.infer<typeof SignUpFormSchema>>({
        resolver: zodResolver(SignUpFormSchema),
        defaultValues: {
            email: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof SignUpFormSchema>) =>{
        setIsSubmitting(true)

        const user_credentials = await createUserWithEmailAndPassword(auth, values.email, values.password)

        await setDoc(doc(db, "users", user_credentials.user.uid), {
            contact: {
                email_address: values.email,
                phone_number: 254795565344
            },
            is_blocked: false,
            is_verified: false,
            name: "John Doe",
            username: "john.doe"
        }).then(() => {
            toast({
                title: "Account Creation",
                description: `Welcome to the Podium ${user_credentials.user.email}.`
            })

            setTimeout(() => {
                navigate("/feed", {
                    replace: true
                })
            }, 1000)
            setIsSubmitting(false)
        }).catch((e) => {
            toast({
                title: "Error",
                description: `Something went wrong: ${e}`
            })
        })
        
    } 

    return <Card className="w-[400px]">
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardHeader className="space-y">
        <CardTitle className="text-3xl">Create Account</CardTitle>
        <CardDescription className="font-semibold">
            Enter your email and password to join <span className="text-blue-500">Podium</span>
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
                    <Input type="email" placeholder="johndoe@gmail.com" {...field} required />
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
                    <Input type="password" placeholder="********" {...field} required />
                </FormControl>
                <FormMessage />
                </FormItem>
                
            )}
            />
        </CardContent>
        <CardFooter className="flex flex-col">
            <Button className="w-full flex items-center gap-1">{isSubmitting && <ClipLoader color="white" size={20} />} Sign Up</Button>
            <p className="mt-2 text-xs text-center text-gray-700">
                {" "}
                Already have an account ?{" "}
                <button title="Sign In" type="button" onClick={() => navigate("/sign-in", {
                    replace: true
                })} className="text-blue-500 hover:underline">Sign In</button>
                
            </p>
        </CardFooter>
    </form>
    </Form>
    </Card>  
  
}
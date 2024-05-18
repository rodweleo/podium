import {
    Card,
    CardContent
  } from "@/components/ui/card"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import {
      Form,
      FormControl,
      FormField,
      FormItem,
      FormMessage,
    } from "@/components/ui/form"
    import { zodResolver } from "@hookform/resolvers/zod"
    import z from "zod"
    import { useForm } from "react-hook-form"
    import { CreatePostFormSchema } from "@/schemas/create-post-schema"
    import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react"
import { usePosts} from "@/hooks/posts/usePosts";
import { useToast } from "@/components/ui/use-toast"

 export const CreatePostForm = () => {
    const [isPublishing, setIsPublishing] = useState(false)
    const { publishPost } = usePosts();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof CreatePostFormSchema>>({
        resolver: zodResolver(CreatePostFormSchema),
        defaultValues: {
            post_content: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof CreatePostFormSchema>) => {
        setIsPublishing(true)
        const response = await publishPost(values);
        console.log(response)
        if(response){
            form.reset();
            form.setValue("post_content", "")
            toast({
                description: `Post published. ${response.id}.`
            })
            setIsPublishing(false)
        }else{
            setIsPublishing(false)
        }
    }
    return <Card className="max-w-[500px]">
        <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>
    <CardContent className="flex flex-col gap-2 mt-5">
            <FormField
            control={form.control}
            name="post_content"
            render={({ field }) => (
                <FormItem>
                <FormControl>
                    <Input placeholder="What do you have for us today?" {...field} required />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <Button className="flex items-center gap-1">{isPublishing && <ClipLoader color="white" size={15}/>} Publish</Button>
            </CardContent>
    </form>
        
        </Form>
    </Card>
}
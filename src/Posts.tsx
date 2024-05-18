import { usePosts } from "@/hooks/posts/usePosts"
import { PostCard } from "@/ui/components/cards/PostCard"
import { ScrollArea, ScrollBar  } from "@/components/ui/scroll-area"

export const Posts = () => {
    const { posts } = usePosts()
    return <ScrollArea className="flex flex-col gap-5 h-screen">
        <section className="flex flex-col gap-2">
            {posts.map((post) => {
                return <PostCard post={post}/>
            })}
        </section>
        <ScrollBar orientation="vertical" />
    </ScrollArea>
}
import { usePosts } from "@/hooks/posts/usePosts"
import { PostCard } from "@/ui/components/cards/PostCard"
export const Posts = () => {
    const { posts } = usePosts()
    return <section className="flex flex-col gap-2">
        {posts.map((post) => {
            return <PostCard post={post}/>
        })}
    </section>
}
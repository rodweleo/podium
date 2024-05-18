import { Post } from "@/utils/types"
import { collection, onSnapshot, query, addDoc, Timestamp } from "firebase/firestore"
import { useEffect, useState } from "react"
import { auth, db } from "@/firebase/configs/firebase"
import z from "zod"
import { CreatePostFormSchema } from "@/schemas/create-post-schema"

export const usePosts = () => {
    const [posts, setPosts] = useState<Post[]>([])

    const fetchPosts = () => {
        const q = query(collection(db, "posts"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetch_posts: Post[] = snapshot.docs.map((doc) => {
                return {...doc.data(), id: doc.id}
            })

            setPosts(fetch_posts);
        })
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    const publishPost = async (payload: z.infer<typeof CreatePostFormSchema>) => {
        try{
            const docRef = await addDoc(collection(db, "posts"), {
                content: payload.post_content,
                created_by: auth.currentUser?.uid,
                created_at: Timestamp.now()
            });

            return docRef;
        }catch(e){
            console.log(e)
            return e
        }
    }

    return {
        posts,
        publishPost
    }
}
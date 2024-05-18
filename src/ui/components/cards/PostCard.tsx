import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SlLike } from "react-icons/sl";
import { FaRegComments } from "react-icons/fa6";
import { TbShare3 } from "react-icons/tb";
import { FaRegBookmark } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { GoReport } from "react-icons/go";
import { RiTranslate } from "react-icons/ri";
import { Post, User } from "@/utils/types";
import { db } from "@/firebase/configs/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import moment from "moment"
import { useTranslation } from "@/hooks/translation/useTranslation";
import { useModeration } from "@/hooks/moderation/useModeration";
import PulseLoader from "react-spinners/PulseLoader";
import { MdVolumeUp } from "react-icons/md";

export const PostCard = ({post}: {
    post: Post
}) => {
    const [user, setUser] = useState<User>()
    const [isPaused, setIsPaused] = useState(false);
    const [utterance, setUtterance] = useState(null);

    const { translate } = useTranslation();
    const { moderate} = useModeration();
    const [translation, setTranslation] = useState<string>("")
    const [isTranslating, setIsTranslating] = useState<boolean>(false)
    const getData = async () => {
        const docRef = doc(db, "users", post.created_by);
        const snap = await getDoc(docRef);

        if(snap.exists()){
            const fetchedData: User = {
                ...snap.data(),
                id: snap.id,
            }

            setUser(fetchedData)
        }
    }

    useEffect(() => {
        getData();
    }, [post])

    useEffect(() => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(post.content);
        
        setUtterance(utterance);

        return () => {
            synth.cancel()
        }
    }, [post])

    const handlePlay = () => {
        const synth = window.speechSynthesis;
    
        if (isPaused) {
          synth.resume();
        }
    
        synth.speak(utterance);
    
        setIsPaused(false);
    };    

    const initiateTranslation = async () => {
        setIsTranslating(true)
        try{
            const response = await translate(post.content)
            setTranslation(response)
            setIsTranslating(false)
        }catch(e){
            setIsTranslating(false)
            console.log(e)
        }
    }

    const initiateModeration = async () => {
        try{
            const response = await moderate(post.content)
            console.log( response);
        }catch(e){
            
            console.log(e.response.data)
        }
    }

    return <Card className="w-[500px]" key={post.id} id={post.id}>
        <CardHeader >
            <div className="w-full flex justify-between">
                <div className="flex gap-2">
                    <Avatar className="h-11 w-11">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <h1>{user?.name}</h1>
                        <span className="text-sm text-slate-500">@{user?.username}</span>
                    </div>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger><Button className="w-fit bg-white text-black hover:bg-slate-100"><CiMenuKebab /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent>
                    <DropdownMenuItem><button title="Read Post" type="button" className="flex items-center w-full gap-5" onClick={() => handlePlay()}><MdVolumeUp /> Read Post</button></DropdownMenuItem>
                    <DropdownMenuItem><button title="Translate" type="button" className="flex items-center w-full gap-5" onClick={() => initiateTranslation()}><RiTranslate/>Translate</button></DropdownMenuItem>
                    <DropdownMenuItem><button title="Report" type="button" className="flex items-center w-full gap-5" onClick={() => initiateModeration()}><GoReport/> Report</button></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
            <p>{post.content}</p>
            {translation.length > 0 && !isTranslating ?  <p><i className="text-blue-600">Translation: </i>  {translation}</p> : null}
            {isTranslating && <span className="flex items-center animate-pulse">Translating <PulseLoader size={12.5} /></span>}
            <span className="font-semibold text-slate-500 text-xs">{moment(post.created_at.toDate()).format("LLL")}</span>
        </CardContent>
        <CardFooter className="hidden items-center w-full justify-between">
            <button type="button" title="Button" className="flex items-center gap-1 text-slate-500">
                <SlLike />
                <span>1.2K</span>
            </button>   
            <button type="button" title="Button" className="flex items-center gap-1 text-slate-500">
                <FaRegComments className="text-lg" />
                <span>1K</span>
            </button> 
            <button type="button" title="Button" className="flex items-center gap-1 text-slate-500">
                <TbShare3   className="text-lg" />
                <span>506</span>
            </button> 
            <button type="button" title="Button" className="flex items-center gap-1 text-slate-500">
                <FaRegBookmark    className="text-sm" />
                <span>12.9K</span>
            </button> 
        </CardFooter>
    </Card>
}
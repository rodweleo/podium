import { Posts } from "@/Posts"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle  } from "@/components/ui/resizable"
import { CreatePostForm } from "@/ui/components/forms/CreatePost"
import { TopCommunities } from "@/ui/components/lists/TopCommunities"
import { Link } from "react-router-dom"

export const Home = () => {
    return <main className="flex h-screen">
        <ResizablePanelGroup
      direction="horizontal"
      className="w-full"
    >
      <ResizablePanel defaultSize={75} className="flex flex-col gap-2">
            <CreatePostForm/>
            <Posts/>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={25} className="p-2">
      <Card className="w-[300px]" >
            <CardHeader className="w-full flex">
                <div className="flex justify-between">
                    <h1 className="w-fit font-bold">Top Communities</h1>
                    <Link to="top-communities" className="w-fit">View All</Link>
                    </div>
            </CardHeader>
            
            <CardContent>
                <TopCommunities/>
            </CardContent>
        </Card>
      </ResizablePanel>
    </ResizablePanelGroup>
        
        
    </main>
}
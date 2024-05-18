import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { Navigation } from "@/ui/Navigation"
import { Outlet } from "react-router-dom"

export const AppLayout = () => {
    return <main className="h-screen">
    <ResizablePanelGroup
    direction="horizontal"
    className="w-full rounded-sm border"
  >
    <ResizablePanel defaultSize={20}>
      <Navigation/>
    </ResizablePanel>
    <ResizableHandle withHandle />
    <ResizablePanel defaultSize={80} className="p-2">
      <Outlet/>
    </ResizablePanel>
  </ResizablePanelGroup>
  </main>
}
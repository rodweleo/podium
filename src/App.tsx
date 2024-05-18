import { Outlet } from 'react-router-dom'
import './App.css'
import { Navigation } from './ui/Navigation'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable'

function App() {
  return (
    <main className="h-screen">
      <ResizablePanelGroup
      direction="horizontal"
      className="w-full rounded-sm border"
    >
      <ResizablePanel defaultSize={25}>
        <Navigation/>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <Outlet/>
      </ResizablePanel>
    </ResizablePanelGroup>
    </main>
  )
}

export default App

import { Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"

export const RootLayout = () => {
    return <>
    <Outlet/>
    <Toaster/>
    </>
}
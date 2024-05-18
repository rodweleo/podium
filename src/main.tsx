import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { SignIn } from '@/pages/auth/sign-in/index.tsx'
import { Home } from '@/pages/home/index.tsx'
import { Notifications } from '@/pages/notifications/index.tsx'
import { AppLayout } from '@/layouts/AppLayout.tsx'
import { RootLayout } from '@/layouts/RootLayout.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    children: [
      {
        path: "sign-in",
        element: <SignIn/>
      },
      {
        path:"/",
        element: <AppLayout/>,
        children:[
          {
            path: "feed",
            element: <Home/>
          },
          {
            path: "notifications",
            element: <Notifications/>
          },
        ]
      },
     
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/>,
)

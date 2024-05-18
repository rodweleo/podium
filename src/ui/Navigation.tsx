import { NavLink } from "react-router-dom"
import { MdOutlineNotificationsActive } from "react-icons/md";
import { MdRssFeed } from "react-icons/md";

export const Navigation = () => {

    const nav_links = [
        {
            path: "feed",
            icon: <MdRssFeed className="text-lg" /> ,
            label: "Feed"
        },
        {
            path: "notifications",
            icon: <MdOutlineNotificationsActive className="text-lg" /> ,
            label: "Notifications"
        }
    ]
    return <nav className="w-full">
        <ul className="p-2">
            {nav_links.map((nav_link) => {
                return <li>
                    <NavLink to={nav_link.path} className="nav-link flex items-center gap-5">
                        {nav_link.icon}
                        <span>{nav_link.label}</span>
                    </NavLink>
                </li>
            })}
            
        </ul>
    </nav>
  
}
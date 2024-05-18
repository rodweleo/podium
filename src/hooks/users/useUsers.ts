import { User } from "@/utils/types";
import { useState } from "react"

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);

    return {}
}
import { db } from "@/firebase/configs/firebase"
import { User } from "@/utils/types"
import { doc, getDoc } from "firebase/firestore"
import { useEffect } from "react"

export const fetchUserById = (id: string) => {
    const [user, setUser] = useState<User | undefined>()

    const getData = async () => {
        const docRef = doc(db, "users", id);
        const snap = await getDoc(docRef);

        if(snap.exists()){
            setUser({
                ...snap.data(),
                id: id
            })
        }
    }

    useEffect(() => {
        getData();
        
    }, [])
}
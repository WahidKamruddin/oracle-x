'use client'

import { useRouter } from "next/navigation";
import { logout } from "../login/actions";

const ProfilePage = () => {
    
    const router = useRouter();

    const handleLogout = async () =>
    {
        await logout();
        router.push("/login");
        router.refresh();
        console.log("reloaded");
    }
    
    return ( 
        <div className="h-screen w-full">
            <button onClick={() => handleLogout()} className="p-4 bg-red-500">Sign out</button>
        </div>
     );
}
 
export default ProfilePage;
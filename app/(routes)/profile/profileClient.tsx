'use client'

import { useRouter } from "next/navigation";
import { logout } from "@/app/(auth)/login/actions";

type ProfileClientProps = {
    name: string;
  };

const ProfileClient = ({ name }: ProfileClientProps) => { 
    const router = useRouter();
    const handleLogout = async () =>
    {
        await logout();
        router.push("/login");
        router.refresh();
    }

    return ( 
        <div className="h-screen w-full flex justify-center items-center">
            <h1>{name}</h1>
            <button onClick={() => handleLogout()} className="p-4 bg-red-500 cursor-pointer">Sign out</button>
        </div>
     );
}
 
export default ProfileClient;
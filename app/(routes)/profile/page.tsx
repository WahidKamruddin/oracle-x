import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import ProfileClient from "./profileClient";


const ProfilePage = async () => {
    
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized");

    const userName = await prisma.user.findUnique({
    where: {
        id: user.userId,
    },
    select: {
        name: true
    }
    });

    if (!userName) throw new Error("No User Name");

    return ( 
        <div>
            <ProfileClient name={userName.name}/>
        </div>
     );
}
 
export default ProfilePage;
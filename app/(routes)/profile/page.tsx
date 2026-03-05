import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import ProfileClient from "./profileClient";


const ProfilePage = async () => {
    
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized");

    const userInfo = await prisma.user.findUnique({
    where: {
        id: user.userId,
    },
    select: {
        name: true
    }
    });

    if (!userInfo) throw new Error("No User Info");

    return ( 
        <div>
            <ProfileClient name={userInfo.name}/>
        </div>
     );
}
 
export default ProfilePage;
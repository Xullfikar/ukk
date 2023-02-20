import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({locals}) => {
    const {user, session} = await locals.validateUser()
    if(!(user && session)) {
        throw redirect(302, "/pengunjung")
    }
    
    const userDetail = await prisma.user.findUnique({
        where: {
            id: user?.userId
        } 
    })

    if(userDetail?.level == "MASYARAKAT"){
        throw redirect(302, "/masyarakat")
    }
    
    return {
        pengaduans: await prisma.pengaduan.findMany({
            include: {
                user: true,
                Tanggapan: {
                    include: {
                        user: true
                    }
                }
            }
        }),
        userDetail
    }
};
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({locals}) => {
    const {user, session} = await locals.validateUser()
    if(!(user && session)) {
        throw redirect(302, "/pengunjung")
    }
    return {
        pengaduans: await prisma.pengaduan.findMany({
            where: {
                status: "PROSES",
                user_id: user?.userId
            }
        }),
        tanggapans: await prisma.tanggapan.findMany({
            include: {
                user: true,
            }
        }),
    }
};
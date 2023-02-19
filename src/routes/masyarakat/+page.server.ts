import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({locals}) => {
    const {user, session} = await locals.validateUser()
    if(!(user && session)) {
        throw redirect(302, "/pengunjung")
    }

    return {
        pengaduans: await prisma.pengaduan.findMany(),
        userId: user?.userId
    }
};
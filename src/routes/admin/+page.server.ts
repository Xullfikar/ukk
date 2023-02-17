import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    return {
        pengaduans: await prisma.pengaduan.findMany({
            include: {
                user: true
            }
        })
    }
};
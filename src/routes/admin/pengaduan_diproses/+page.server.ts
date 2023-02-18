import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    return {
        tanggapans: await prisma.tanggapan.findMany({
            include: {
                user: true,
                pengaduan: {
                    include: {
                        user: true
                    }
                }
            }
        })
    }
};
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    return {
        tanggapans: await prisma.tanggapan.findMany({
            include: {
                user: true,
            }
        }),

        pengaduans: await prisma.pengaduan.findMany({
            where: {
                status: "SELESAI"
            },
            include: {
                user: true
            }
        })
    }
};
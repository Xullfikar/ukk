import { prisma } from "$lib/server/prisma";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({params}) => {
    return {
        pengaduan: await prisma.pengaduan.findUnique({
            where: {
                id: Number(params.pengaduanId)
            }
        })
    }
};
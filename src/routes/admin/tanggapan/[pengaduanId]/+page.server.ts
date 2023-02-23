import { prisma } from "$lib/server/prisma";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "../[pengaduanId]/$types";

export const load: PageServerLoad = async ({params}) => {
    const pengaduan = await prisma.pengaduan.findUnique({
        where: {
            id: Number(params.pengaduanId)
        },
        include: {
            user: true
        }
    });

    if(pengaduan?.status == "SELESAI") {
        throw redirect(302, "/admin")
    }
    
    return {
        pengaduan,
        tanggapans: await prisma.tanggapan.findMany({
            where: {
                id_pengaduan: Number(params.pengaduanId)
            }
        })
    }
};


export const actions: Actions = {
    default: async ({request, locals, params}) => {
        const {user, session} = await locals.validateUser();
        if(!(user && session)) {
            throw redirect(302, "/")
        }

        const tanggal = new Date().toLocaleDateString();

        const { tanggapan, status } = Object.fromEntries(await request.formData()) as {
            tanggapan: string,
            status: any
        }

        if(!status) {
            return fail(400, { tanggapan, missingStatus: true })
        }

        try {
            await prisma.pengaduan.update({
                where: {
                    id: BigInt(params.pengaduanId)
                },
                data: {
                    status
                }
            })

            await prisma.tanggapan.create({
                data: {
                    id_pengaduan: BigInt(params.pengaduanId),
                    tanggal,
                    tanggapan,
                    id_petugas: user.userId
                }
            })

        } catch (error) {
            console.log(error);
            return fail(500, {message: "Terjadi kesalahan saat memberi Tanggapan!"})
        }
        throw redirect(302, "/admin")
    }
};
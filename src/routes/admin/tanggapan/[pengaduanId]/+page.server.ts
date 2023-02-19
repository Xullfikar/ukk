import { prisma } from "$lib/server/prisma";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({params}) => {
    return {
        pengaduan: await prisma.pengaduan.findUnique({
            where: {
                id: Number(params.pengaduanId)
            },
            include: {
                user: true
            }
        }),
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

        const tanggal = new Date();

        const { tanggapan, status } = Object.fromEntries(await request.formData()) as {
            tanggapan: string,
            status: any
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

            throw redirect(302, "/admin")
        } catch (error) {
            console.log(error);
            return fail(500, {message: "Terjadi kesalahan saat memberi Tanggapan!"})
        }
    }
};
import type { PageServerLoad } from "../../$types";
import { prisma } from "$lib/server/prisma"
import { error, fail, redirect, type Actions } from "@sveltejs/kit";

export const load: PageServerLoad = async ({params}) => {
    const getUser = async () => {
        const user = await prisma.user.findUnique({
            where: {
                id: String(params.userId)
            }
        })
        if(!user) {
            throw error(404, "User Not Found")
        }
        return user
    }

    return {
        users: getUser()
    }
};

export const actions: Actions = {
    updateUser: async ({request,params}) => {
        const { nama, username, telepon, nik, level } = Object.fromEntries(await request.formData()) as {
            nama: string,
            username: string,
            telepon: string,
            nik: string,
            level: any
        }

        try {
            await prisma.user.update({
                where: {
                    id: String(params.userId)
                },
                data: {
                    nama,
                    username,
                    telepon,
                    nik,
                    level
                }
            })
            throw redirect(302, "/admin/user")
        } catch (error) {
            console.log(error);
            return fail(500, {message: "Gagal update Article"})                 
        }
    }
};
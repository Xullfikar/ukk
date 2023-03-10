import { auth } from "$lib/server/lucia";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const {user, session} = await locals.validateUser()
    if(!(user && session)) {
        throw redirect(302, "/pengunjung")
    }
    
    const userDetail = await prisma.user.findUnique({
        where: {
            id: user?.userId
        } 
    })

    if(userDetail?.level != "ADMIN"){
        throw redirect(302, "/")
    }
};

export const actions: Actions = {
    default: async ({ request }) => {
        const { nama, username, password, telepon, nik, level } = Object.fromEntries(
            await request.formData()
        ) as Record<string, string>;

        try {
            await auth.createUser({
                key: {
                    providerId: 'username',
                    providerUserId: username,
                    password
                },
                attributes: {
                    nama,
                    username,
                    telepon,
                    nik,
                    level
                }
            });
            throw redirect(302, "/admin/user")
        } catch (error) {
            console.log(error);
            return fail(400, {message: "Tidak dapat membuat User"})
        }
    },
};
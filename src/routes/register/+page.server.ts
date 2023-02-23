import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.validate()
    if(session) {
        throw redirect(302, "/")
    }
};

export const actions: Actions = {
    default: async ({ request }) => {
        const { nama, username, password, Kpassword, telepon, nik } = Object.fromEntries(
            await request.formData()
        ) as Record<string, string>;

        const level = "MASYARAKAT";

        const usernameCheck = await prisma.user.findUnique({
            where: {
                username: username
            }
        })

        if(usernameCheck) {
            return fail(400, { username, usernameReady: true })
        }

        if(password != Kpassword) {
            return fail(400, { incorrect: true })
        }

        const nikcheck = await prisma.user.findUnique({
            where: {
                nik: nik 
            }
        })

        if(nikcheck) {
            return fail(400, { nik, nikReady: true })
        }

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
        } catch (error) {
            console.log(error);
            return fail(400, {message: "Tidak dapat membuat User"})
        }
        throw redirect(302, "/login")
    },
};
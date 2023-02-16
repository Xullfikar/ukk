import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    return {
        users: await prisma.user.findMany()
    }
};

export const actions: Actions = {
    deleteUser: async ({ url, locals }) => {
        const {user, session} = await locals.validateUser()
        if(!(user && session)) {
            throw redirect(302, "/")
        }

        const id = url.searchParams.get("id");
        if(!id){
            return fail(400, {message: "invalid Request!"})
        }

        try {
            await prisma.user.delete({
                where: {
                    id: String(id)
                }
            })
        } catch (error) {
            console.log(error);
            return fail(500, {message: "Sesuatu bermasalh saat ingin menghapus User"})            
        }

        return {
            status: 200
        }
    }
};
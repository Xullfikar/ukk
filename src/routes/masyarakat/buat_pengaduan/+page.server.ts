import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
    default: async ({request, locals}) => {
        const {user, session} = await locals.validateUser()
        if(!(user && session)) {
            throw redirect(302, "/")
        }

        const tanggal = new Date().toDateString()
        
        const { judul, isi, foto } = Object.fromEntries(await request.formData()) as Record<string, string>
        
        try {
            const buat = await prisma.pengaduan.create({
                data: {
                    judul,
                    tanggal,
                    isi,
                    foto,
                    user_id: user.userId
                }
            })
        } catch (error) {
            console.log(error);
            return fail(500, {message: "Terjadi kesalahan saat mengirim pengaduan!"})
        } 
        throw redirect(302, "/masyarakat")
    }
};
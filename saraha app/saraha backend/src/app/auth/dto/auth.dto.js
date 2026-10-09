import z from "zod"

export const signupDto =z.object({
    email : z.email().toLowerCase().trim().min(1),
    firstName:z.string().min(3).max(30).trim(),
    lastName:z.string().min(3).max(30).trim(),
    password:z.string().min(8).max(20).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    .trim(),
    phone :z.string().regex(/^(\+20)?01[0125][0-9]{8}$/gm).optional(),
    //regex(/^(\+20)?01[0-25][0-9]{8}$/gm)
   // provider : z.enum(["local", "google", "facebook"]).default("local"),
    gender : z.enum(["male","female"]).default("male").optional(),
    dop :z.date().optional()
})//.strict()


export const verifyAccountDto =z.object({
   email : z.email().toLowerCase().trim().min(1),
     code:z.string().length(6),
})


export const loginDto =z.object({
    email : z.email().toLowerCase().trim().min(1),
     password:z.string().min(8).max(20).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).trim()
})


export const sendOtpDto =z.object({
    email : z.email().toLowerCase().trim().min(1),
})


export const resetPasswprdDto =z.object({
    email : z.email().toLowerCase().trim().min(1),
     code:z.string().length(6),
     newPassword :z.string().min(8).max(20).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).trim()
})

export const loginWithGoogleDto = z.object({
    idToken: z.string().min(1).trim(),
  });
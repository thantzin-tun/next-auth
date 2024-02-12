import * as z from "zod";

export const RegisterSchema = z.object({
    username: z
        .string()
        .min(2, {
            message: "Username must be at least 2 characters.",
        })
        .max(50),
    email: z
        .string()
        .email({ message: "Invalid email address" })
        .endsWith(".com", { message: "Only .com domains allowed" }),
    password: z.string().min(8, {
        message: "Password must be 8 characters long.",
    }),
});

// .partial()
// .superRefine(({ password }, checkPassComplexity) => {
//     const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
//     const containsLowercase = (ch: string) => /[a-z]/.test(ch);
//     const containsSpecialChar = (ch: string) =>
//         /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
//     let countOfUpperCase = 0,
//         countOfLowerCase = 0,
//         countOfNumbers = 0,
//         countOfSpecialChar = 0;
//     for (let i = 0; i < password!.length; i++) {
//         let ch = password!.charAt(i);
//         if (!isNaN(+ch)) countOfNumbers++;
//         else if (containsUppercase(ch)) countOfUpperCase++;
//         else if (containsLowercase(ch)) countOfLowerCase++;
//         else if (containsSpecialChar(ch)) countOfSpecialChar++;
//     }
//     if (
//         countOfLowerCase < 1 ||
//         countOfUpperCase < 1 ||
//         countOfSpecialChar < 1 ||
//         countOfNumbers < 1
//     ) {
//         checkPassComplexity.addIssue({
//             code: "custom",
//             message: "password does not meet complexity requirements",
//         });
//     }
// });

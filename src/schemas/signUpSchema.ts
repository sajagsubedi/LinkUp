import { z } from "zod";

export const emailValidation = z
  .email({ message: "Invalid email address" })
  .max(50, { message: "Email cannot be longer than 50 characters" });

export const signUpSchema = z
  .object({
    profile_picture: z
      .instanceof(File, {
        message: "Profile Picture is required",
      })
      .refine(
        (file) => file.size <= 10 * 1024 * 1024, // Max file size: 10MB
        "File size must be less than or equal to 10MB"
      ),
    fullname: z
      .string()
      .min(3, { message: "Full name must be at least 3 characters long" })
      .max(50, { message: "Full name  cannot be longer than 50 characters" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(1024, { message: "Password cannot be longer than 1024 characters" }),
    email: emailValidation,
    account_type: z.enum(["learner", "contributor"], {
      message: "Please select an account type",
    }),
    purpose: z
      .enum(
        ["post-events", "post-club", "post-internship", "provide-mentorship"],
        {
          message: "Please select a purpose",
        }
      )
      .optional(),
  })
  .refine(
    (data) => {
      // If account type is contributor, purpose is required
      if (data.account_type === "contributor" && !data.purpose) {
        return false;
      }
      return true;
    },
    {
      message: "Purpose is required when account type is Contributor",
      path: ["purpose"],
    }
  );

export type SignUpForm = z.infer<typeof signUpSchema>;

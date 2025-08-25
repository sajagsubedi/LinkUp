import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { LoaderCircle, Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { useAuth } from "../hooks/useAuth";
import { signUpSchema, type SignUpForm } from "../schemas/signUpSchema";
import { useEffect, useState } from "react";
import { uploadImage } from "../services/imageService";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      profile_picture: undefined,
      fullname: "",
      email: "",
      password: "",
      account_type: "learner",
      purpose: undefined,
    },
  });
  const navigate = useNavigate();

  const [profilePictureSrc, setProfilePictureSrc] =
    useState("/assets/user.png");

  // Watch account type to conditionally show purpose dropdown
  const accountType = watch("account_type");

  const handleProfilePictureUpload: React.ChangeEventHandler<
    HTMLInputElement
  > = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("profile_picture", file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProfilePictureSrc(reader.result as string);
      };
    }
  };

  const { signup, authState } = useAuth();

  const onSubmit = async (data: SignUpForm) => {
    try {
      const {
        fullname,
        email,
        password,
        profile_picture,
        account_type,
        purpose,
      } = data;
      const response = await uploadImage(profile_picture, "user-images");

      if (!response || !response?.publicUrl) {
        toast.error("Error uploading profile picture!");
        return;
      }

      const { status, message } = await signup(
        response.publicUrl,
        fullname,
        email,
        password,
        account_type,
        purpose
      );

      if (status) {
        toast.success("Signed up successfully! Verify your email address");
        navigate("/");
        return;
      }
      toast.error(message);
    } catch (err) {
      console.log(err);
      toast.error("Internal server error");
    }
  };

  useEffect(() => {
    if (authState.session) {
      navigate("/dashboard");
    }
  }, [authState, navigate]);

  return (
    <section className="text-gray-600 body-font px-6 flex justify-center bg-white w-max mx-auto py-5 rounded mt-15 min-h-[70vh]">
      <div className="w-full sm:w-[325px] flex flex-col">
        <h2 className=" text-2xl md:text-3xl mb-4 font-bold title-font text-left "></h2>

        <div></div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="avatar" className="leading-7 text-sm text-gray-600">
              Profile Picture
            </label>
            <div className="w-full flex justify-center ">
              <div className="bg-gray-50 rounded-full overflow-hidden w-24 h-24 relative">
                <img
                  src={profilePictureSrc}
                  width={200}
                  height={200}
                  alt={"profilePicture"}
                  className="w-full h-full"
                />
                <div className="absolute w-full h-full top-0 right-0 flex justify-center items-center">
                  <Plus className="text-white absolute" />
                </div>
                <div className="absolute w-full h-full top-0 right-0 flex justify-center items-center bg-gray-600 opacity-20"></div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureUpload}
                  className="absolute z-[99] inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
            {errors.profile_picture && (
              <p className="text-red-500 text-sm">
                {errors.profile_picture.message}
              </p>
            )}
          </div>
          {/* Full Name */}
          <div className="relative mb-4">
            <label
              htmlFor="fullname"
              className="leading-7 text-sm text-gray-600"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              {...register("fullname")}
              required
              placeholder="John Doe"
              className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/40 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            {errors.fullname && (
              <p className="text-red-500 text-sm">{errors.fullname.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              required
              placeholder="johndoe@example.com"
              className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/40 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              required
              placeholder="••••••••"
              className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/40 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Account Type */}
          <div className="relative mb-4">
            <label className="leading-7 text-sm text-gray-600">
              Account Type
            </label>
            <Select
              value={accountType}
              onValueChange={(value) => {
                setValue("account_type", value as "learner" | "contributor");
                // Clear purpose when switching to learner
                if (value === "learner") {
                  setValue("purpose", undefined);
                }
              }}
            >
              <SelectTrigger className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/40 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="learner">Learner</SelectItem>
                <SelectItem value="contributor">Contributor</SelectItem>
              </SelectContent>
            </Select>
            {errors.account_type && (
              <p className="text-red-500 text-sm">
                {errors.account_type.message}
              </p>
            )}
          </div>

          {/* Purpose - Only show when Contributor is selected */}
          {accountType === "contributor" && (
            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-600">Purpose</label>
              <Select
                onValueChange={(value) => {
                  setValue(
                    "purpose",
                    value as
                      | "post-events"
                      | "post-club"
                      | "post-internship"
                      | "provide-mentorship"
                  );
                }}
              >
                <SelectTrigger className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/40 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="post-events">Post Event</SelectItem>
                  <SelectItem value="post-club">Post Club</SelectItem>
                  <SelectItem value="post-internship">
                    Post Internship
                  </SelectItem>
                  <SelectItem value="provide-mentorship">
                    Provide Mentorship
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.purpose && (
                <p className="text-red-500 text-sm">{errors.purpose.message}</p>
              )}
            </div>
          )}

          {/* Submit */}
          <Button type="submit" className="w-full">
            {isSubmitting && <LoaderCircle className="animate-spin text-lg" />}
            Signup
          </Button>
        </form>

        {/* Divider */}
        <div className="mt-5 flex items-center gap-2 justify-center text-gray-500">
          <hr className="w-[175px] h-[2px] bg-gray-200" />
          or
          <hr className="w-[175px]  h-[2px] bg-gray-200" />
        </div>

        {/* Signin Link */}
        <p className="flex gap-2 justify-end mt-6">
          Already have an account?
          <Link className="text-primary underline" to="/login">
            Signin
          </Link>
        </p>
      </div>
    </section>
  );
}

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { useAuth } from "../hooks/useAuth";
import { signInSchema, type SignInForm } from "../schemas/signInSchema";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const { login, authState } = useAuth();

  const onSubmit = async (data: SignInForm) => {
    try {
      const { status, message } = await login(data.email, data.password);
      console.log(status, message);
      if (status) {
        toast.success("Logged in successfully!");
        navigate("/dashboard");
        return;
      }
      toast.error(message);
      return;
    } catch (err) {
      console.log("Error occured", err);
      toast.error("Something went wrong! Please try again later.");
      return;
    }
  };
  useEffect(() => {
    if (authState.session) {
      navigate("/dashboard");
    }
  }, [authState, navigate]);

  return (
    <section className="text-gray-600 body-font px-6 pt-5 mt-20 flex justify-center mx-auto bg-white w-max rounded min-h-[70vh]">
      <div className="w-full sm:w-[325px] flex flex-col">
        <h2 className="text-2xl md:text-3xl mb-4 font-bold title-font text-left">
          Hey&#44;
          <br />
          <span className="text-primary">Welcome</span> back.
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              placeholder="Enter your email"
              className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/40 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
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
              placeholder="••••••••"
              required
              className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/40 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          {/* Submit */}
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting && <LoaderCircle className="animate-spin text-lg" />}
            Signin
          </Button>
        </form>

        {/* Divider */}
        <div className="mt-5 flex items-center gap-2 justify-center text-gray-500">
          <hr className="w-[175px] h-[2px] bg-gray-200" />
          or
          <hr className="w-[175px] h-[2px] bg-gray-200" />
        </div>

        {/* Signup Link */}
        <p className="flex gap-2 justify-end mt-6">
          Don&apos;t have an account?
          <Link className="text-primary underline" to="/signup">
            Signup
          </Link>
        </p>
      </div>
    </section>
  );
}

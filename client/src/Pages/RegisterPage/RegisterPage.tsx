import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/Store/store";
import { registerThunk } from "@/Store/features/Auth/AuthThunks";
import { toast } from "sonner";

const RegisterSchema = z
  .object({
    username: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof RegisterSchema>;

export default function RegisterPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { error } = useSelector((state: RootState) => state.Auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    console.log("Register Data:", data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...dataWithoutConfirmPassword } = data;
    // TODO: Call register API here
    try {
      const resultAction = await dispatch(
        registerThunk(dataWithoutConfirmPassword)
      ).unwrap();
      toast.success(
        `your account is created , you can login now ${resultAction.username}`
      );
    } catch (err) {
      console.error("error login", error);

      toast.error(err instanceof Error ? err.message : "Register failed");
    }
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto my-20 p-6 border rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="username" className="px-0" {...register("username")} />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            className="px-0"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            className="px-0"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            className="px-0"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full bg-[#184297] text-white">
          Register
        </Button>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-[#00bcda] underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

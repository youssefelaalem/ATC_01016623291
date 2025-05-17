import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "@/Store/features/Auth/AuthThunks";
import type { AppDispatch, RootState } from "@/Store/store";
import { toast } from "sonner";
// import { log } from "node:console";

const LoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.Auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const resultAction = await dispatch(loginThunk(data)).unwrap();
      console.log("resultAction", resultAction);
      localStorage.setItem("user", JSON.stringify(resultAction));
      toast.success(`Welcome ${resultAction.username}`);
      navigate("/");
    } catch (err) {
      console.error("error login", error);

      toast.error(err instanceof Error ? err.message : "Login failed");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  // console.log("sss", user);

  return (
    <div className="max-w-md mx-auto my-20 p-6 border rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

        <Button type="submit" className="w-full bg-[#184297] text-white">
          Login
        </Button>
        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#00bcda] underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
export default LoginPage;

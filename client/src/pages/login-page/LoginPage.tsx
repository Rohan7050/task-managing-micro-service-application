import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { loginSchema, type LoginInputType } from "../../schema/loginSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from "@/store/auth.store";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/api/endpoints/auth.api";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";


function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInputType>({
    resolver: zodResolver(loginSchema)
  });
  const navigate = useNavigate();
  const {setAuth} = useAuthStore();
  const { mutate: login } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setAuth(data.data, true);
      toast.success("Login successfully.");
      navigate("/boards");
      console.log("login", data);
    },
    onError: (error: AxiosError) => {
      setAuth(null, false);
      console.log("login err", error, error?.status);
      if (error?.status === 400) {
        toast.error("Invalid Credentials");
      } else if (error.response?.status === 404) {
        toast.error("User not found");
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  const onSubmit: SubmitHandler<LoginInputType> = (data) => {
    console.log(data);
    login(data);
  }

  return (
    <div className="isolate px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-4xl">Login Page</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="email" className="text-start block text-sm/6 font-semibold text-white">
              Email
            </label>
            <div className="mt-2.5">
              <input
                {...register("email", {maxLength: 50, minLength:5, required: true})}
                id="email"
                name="email"
                placeholder='Email'
                autoComplete="email"
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              />
              {errors.email && (
                <p className="text-red-300 text-start text-sm mt-1">Invalid Email</p>
              )}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="first-name" className="text-start block text-sm/6 font-semibold text-white">
              Password
            </label>
            <div className="mt-2.5">
              <input
                {...register("password", {maxLength: 20, minLength: 4, required: true})}
                id="password"
                name="password"
                placeholder='Password'
                type="text"
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              />
              {errors.password && (
                <p className="text-red-300 text-start text-sm mt-1">Invalid Password (must be 4 to 20 charactors long)</p>
              )}
            </div>
          </div>
          
        </div>
        <div className="mt-15">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Login
          </button>
        </div>
        <p className="text-sm/6 text-gray-400 pt-4">
          Don't have account{', '}
          <Link to="/register" className="font-semibold whitespace-nowrap text-indigo-400">
            Register
          </Link>
          .
        </p>
      </form>
    </div>
  )
}

export default LoginPage
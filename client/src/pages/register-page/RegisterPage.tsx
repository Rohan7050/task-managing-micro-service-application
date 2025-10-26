import { useState } from 'react';
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from 'react-router-dom';
import { registerSchema, type RegisterInputType } from '../../schema/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInputType>({
    resolver: zodResolver(registerSchema)
  });
  const [showPasswordNotMatch, setShowPasswordNotMatch] = useState(false);
  const onSubmit: SubmitHandler<RegisterInputType> = (data) => {
    if(data.confirmpassword !== data.password){
      setShowPasswordNotMatch(true);
      return;
    }else {
      setShowPasswordNotMatch(false)
    }
    console.log(data)
  }

  return (
    <div className="isolate px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-4xl">Register Page</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} action="#" method="POST" className="mx-auto mt-10 max-w-xl">
        <div className='grid grid-cols-6 gap-x-8 gap-y-6'>
          
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div >
            <label htmlFor="email" className="text-start block text-sm/6 font-semibold text-white">
              First Name
            </label>
            <div className="mt-2.5">
              <input
                {...register("firstname", {maxLength: 50, minLength:5, required: true})}
                id="firstname"
                name="firstname"
                placeholder='First Name'
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              />
              {errors.firstname && (
                <p className="text-red-300 text-start text-sm mt-1">Invalid First Name</p>
              )}
            </div>
          </div>
          <div >
            <label htmlFor="email" className="text-start block text-sm/6 font-semibold text-white">
              Last Name
            </label>
            <div className="mt-2.5">
              <input
                {...register("lastname", {maxLength: 50, minLength:5, required: true})}
                id="lastname"
                name="lastname"
                placeholder='Last Name'
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              />
              {errors.lastname && (
                <p className="text-red-300 text-start text-sm mt-1">Invalid Last Name</p>
              )}
            </div>
          </div>
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
                type="password"
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              />
              {errors.password && (
                <p className="text-red-300 text-start text-sm mt-1">Invalid Password (must be 4 to 20 charactors long)</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="first-name" className="text-start block text-sm/6 font-semibold text-white">
              Confirm Password
            </label>
            <div className="mt-2.5">
              <input
                {...register("confirmpassword", {maxLength: 20, minLength: 4, required: true})}
                id="confirmpassword"
                name="confirmpassword"
                placeholder='Confirm Password'
                type="password"
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              />
              {errors.confirmpassword && (
                <p className="text-red-300 text-start text-sm mt-1">Invalid Password (must be 4 to 20 charactors long)</p>
              )}
              {!errors.confirmpassword && showPasswordNotMatch && (
                <p className="text-red-300 text-start text-sm mt-1">Password does not match.</p>
              )}
            </div>
          </div>
          
        </div>
        <div className="mt-15">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Register
          </button>
        </div>
        <p className="text-sm/6 text-gray-400 pt-4">
          Already have account{', '}
          <Link to="/login" className="font-semibold whitespace-nowrap text-indigo-400">
            Login
          </Link>
          .
        </p>
      </form>
    </div>
  )
}

export default RegisterPage
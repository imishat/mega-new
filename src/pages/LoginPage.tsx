/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { useLoginUserMutation } from "../redux/Features/auth/authApi"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { setAuthData } from "../redux/Features/auth/authSlice"
import toast from "react-hot-toast"

type LoginFormData = {
  email: string
  password: string
  rememberMe: boolean
}

export default function LoginPage() {
  const [signInUser, { isLoading }] = useLoginUserMutation()
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { data }:any = useAppSelector((state) => state.auth);
console.log(data?.data?.email)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    // Navigate to dashboard after successful login
    try {
      const response: any = await signInUser(data).unwrap()
      if (response?.success) {
        if (response?.token) {
          localStorage.setItem("access_token", response.token)
          dispatch(setAuthData(response));
          console.log(response)
          toast.success("Login successfully!")
          navigate("/Home")
          // window.location.reload();
          // navigate(-1);
        } else {
          toast.error("Token not received!")
        }
      }
    } catch (error: any) {
      toast.error(error?.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-600">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold ">Analytics Dashboard</h1>
          <p className=" mt-2">Sign in to your account</p>
        </div>

        {/* Form errors summary */}
        {(errors.email || errors.password) && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>Please fix the following errors:</p>
            <ul className="list-disc pl-5">
              {errors.email && <li>{errors.email.message}</li>}
              {errors.password && <li>{errors.password.message}</li>}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className={`w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              className={`w-full px-3 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                className="h-4 w-4 text-white border-gray-300 rounded"
                {...register("rememberMe")}
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="/forget-password" className="text-white hover:underline">
                Forgot your password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-900 text-white hover:bg-gray-700 font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {
              isLoading ? 'Please wait...' : 'Sign In'
            }
          </button>
        </form>

        <div className="text-center mt-6 w-full">
          <p className="w-full cursor-pointer bg-blue-900 text-white hover:bg-gray-700 font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ">
            {" "}
            <Link to="/sign-up" className="">
             Free Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}


/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { useCreateUserMutation } from "../redux/Features/auth/authApi"
import toast from "react-hot-toast"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { setAuthData } from "../redux/Features/auth/authSlice"

type RegisterFormData = {
  name: string
  email: string
  password: string
  username: string
}

export default function RegisterPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [signupUser, { isLoading }] = useCreateUserMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      username: "",
    },
  })

  const { user }: any = useAppSelector(state => state.auth)
console.log(user)
  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response: any = await signupUser(data).unwrap()
      if (response?.success) {
        if (response?.token) {
          localStorage.setItem("access_token", response.token)
           dispatch(setAuthData(response));
          toast.success("Please check your email")
          navigate("/verify")
        } else {
          toast.error("Token not received!")
        }
      }
    } catch (error: any) {
      toast.error(error?.message)
    }


  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-600 ">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md text-white">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Create an Account</h1>
          <p className=" mt-2">Join our analytics platform</p>
        </div>

        {/* Form errors summary */}
        {Object.keys(errors).length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>Please fix the following errors:</p>
            <ul className="list-disc pl-5">
              {errors.name && <li>{errors.name.message}</li>}
              {errors.email && <li>{errors.email.message}</li>}
              {errors.password && <li>{errors.password.message}</li>}
              {errors.username && <li>{errors.username.message}</li>}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block  text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              className={`w-full px-3 py-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="John Doe"
              {...register("name", {
                required: "Full name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block  text-sm font-medium mb-2">
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

          <div className="mb-4">
            <label htmlFor="password" className="block  text-sm font-medium mb-2">
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

          <div className="mb-6">
            <label htmlFor="username" className="block  text-sm font-medium mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              className={`w-full px-3 py-2 border ${errors.username ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="username"
              {...register("username", {
                required: "Username is required",
              })}
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-900 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {
              isLoading ? 'Please wait...' : 'Create Account'
            }
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm ">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-white hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}


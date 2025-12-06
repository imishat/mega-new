/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useResetPasswordMutation } from "../redux/Features/auth/authApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

interface ResetPasswordInputs {
    password: string;
    confirmPassword: string;
}

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const [resetPassword, { isLoading: loading }] = useResetPasswordMutation();

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<ResetPasswordInputs>();

    

    const onSubmit: SubmitHandler<ResetPasswordInputs> = async (data) => {
        

        try {
            const response: any = await resetPassword({
                token: token as string,
                data,
            }).unwrap();

            if (response?.success) {
                navigate("/sign-in");
                toast('Successfully changed your password')
            } else {
                toast.error('something was wrong')
            }
        } catch (error: any) {
            toast.error( error?.message)
        }
    };

    return (
        <div className="h-screen flex justify-center items-center p-4">
            <div className="bg-gray-800 shadow-lg rounded-lg max-w-sm w-full p-8">
                <h2 className="text-2xl font-bold mb-4 text-primaryColor">Reset Password</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* New Password Field */}
                    <div className="mb-4 relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-100">
                            New Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            {...register("password", { required: "Password is required" })}
                            className={`mt-1 w-full px-3 py-2 border ${errors.password ? "border-primaryColor" : "border-gray-300"
                                } rounded-lg shadow-sm focus:outline-none focus:ring-primaryColor focus:border-primaryColor`}
                            placeholder="Enter your new password"
                        />
                        <div
                            className="absolute inset-y-0 right-0 top-5 pr-3 flex items-center cursor-pointer"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </div>
                        {errors.password && <p className="text-primaryColor text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="mb-4 relative">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-100">
                            Confirm Password
                        </label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            {...register("confirmPassword", {
                                required: "Confirm Password is required",
                                validate: (value) => value === getValues("password") || "Passwords do not match",
                            })}
                            className={`mt-1 w-full px-3 py-2 border ${errors.confirmPassword ? "border-primaryColor" : "border-gray-300"
                                } rounded-lg shadow-sm focus:outline-none focus:ring-primaryColor focus:border-primaryColor`}
                            placeholder="Confirm your new password"
                        />
                        <div
                            className="absolute inset-y-0 right-0 top-5 pr-3 flex items-center cursor-pointer"
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                        >
                            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-primaryColor text-sm mt-1">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg font-bold hover:bg-gray-700 cursor-pointer transition duration-200"
                    >
                        {loading ? "Please Wait..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
}

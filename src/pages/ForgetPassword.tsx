/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, SubmitHandler } from 'react-hook-form';
import { useForgetPasswordMutation } from '../redux/Features/auth/authApi';
import toast from 'react-hot-toast';

interface ForgotPasswordInputs {
    email: string;
}

const ForgetPassword = () => {
    const [forgetPassword, { isLoading: loading }] = useForgetPasswordMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordInputs>();
    const onSubmit: SubmitHandler<ForgotPasswordInputs> = async (data) => {
        console.log(data);
        try {
            const response: any = await forgetPassword(data).unwrap();
            if (response?.success === true) {
                // Save the token to localStorage
                if (response?.token) {
                    toast(response?.message)
                } else {
                    toast('Token not received!')
                }
            } else {
                toast.error('something was wrong')
            }
            console.log(response)
        } catch (error: any) {
            console.log(error);
            toast.error( error?.message)
        }
    };

    return (
        <div className="h-screen flex justify-center items-center p-4 bg-gray-600">
            <div className="bg-gray-800 shadow-lg rounded-lg max-w-sm w-full p-8">
                <h2 className="text-2xl font-bold mb-4 text-white">Forgot Password</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Email Field */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-100">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register('email', { required: 'Email is required' })}
                            className={`mt-1 w-full px-3 py-2 border ${errors.email ? 'border-primaryColor' : 'border-gray-300 text-amber-100'
                                } rounded-lg shadow-sm focus:outline-none focus:ring-primaryColor focus:border-primaryColor`}
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-primaryColor text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-gray-900 cursor-pointer text-white py-2 px-4 rounded-lg font-bold hover:bg-blue-700 transition duration-200"
                    >
                        {loading ? "Please Wait..." : "Next"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;

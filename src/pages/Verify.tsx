/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { useVerifyOtpMutation } from '../redux/Features/auth/authApi';
import { useAppSelector } from '../redux/hooks';
import { useNavigate } from 'react-router-dom';

const Verify = () => {
    const token = useAppSelector(state => state.auth.token)
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(4).fill(null));
    const [verifyOTP, { isLoading }] = useVerifyOtpMutation();
    const navigate = useNavigate()
    const [error, setError] = useState('')

    const handleChange = (index: number, value: string) => {
        if (/[^0-9]/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const enteredOTP = otp.join('');

        if (enteredOTP.length < 4) {
            toast.error('Please enter all 4 digits');
            return;
        }

        try {
            const finalData = {
                code: enteredOTP,
                activationToken: token, // Ensure 'token' is defined properly
            };

            console.log("Sending data:", finalData); // Debugging step

            const response: any = await verifyOTP(finalData).unwrap();

            if (response.success) {
                navigate('/sign-in')
                toast.success('verify success')
            } else {
                setError("Something was wrong!");
                setTimeout(() => {
                    setError("");
                    setOtp(["", "", "", ""]);
                }, 3000);
            }
        } catch {
            setError("Invalid Otp");
            setTimeout(() => {
                setError("");
                setOtp(["", "", "", ""]);
            }, 3000);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center p-4 bg-gray-600">
            <div className="bg-gray-800 shadow-lg rounded-lg max-w-sm w-full p-8">
               <h2 className="text-2xl font-bold text-center text-white">Check Your Email</h2>
               
                <h2 className="text-2xl font-bold text-center text-white">Enter OTP</h2>
                
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="flex justify-center space-x-2 mb-4">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                ref={(el) => {
                                    inputRefs.current[index] = el;
                                }}
                                className="w-10 h-10 text-center text-lg border-2 border-gray-300 rounded focus:border-primary focus:outline-none text-amber-300"
                            />
                        ))}
                    </div>

                    {
  error && 
        <p className="text-red-500 text-sm mb-2">{error}</p>
}

                    <button
                        type="submit"
                        className="w-full bg-blue-900 text-white py-2 px-4 rounded-lg font-bold hover:bg-gray-700 cursor-pointer transition duration-200"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Verify;

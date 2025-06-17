"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiMail, FiArrowRight, FiCheckCircle, FiAlertCircle, FiRefreshCw } from "react-icons/fi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showTroubleshoot, setShowTroubleshoot] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email format";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would call your password reset API here
      // const response = await fetch('/api/auth/forgot-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });

      // if (!response.ok) throw new Error('Password reset failed');

      setIsSuccess(true);
    } catch (error) {
      setErrors({ ...errors, submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Resend logic here
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4 sm:p-6">
        <div className="w-full max-w-md bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden transform transition-all duration-300">
          <div className="bg-gradient-to-r from-amber-500/10 to-amber-600/20 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pattern-dots pattern-gray-600 pattern-size-4" />
            <div className="relative z-10">
              <h1 className="text-3xl font-bold text-amber-400 mb-2 tracking-tight">𝓛𝓸𝓬𝓪𝓵𝓔𝓪𝓽𝓮𝓼</h1>
              <div className="h-1 w-16 bg-amber-500 mx-auto mt-4 rounded-full" />
            </div>
          </div>

          <div className="p-8 sm:p-10 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-500/20 mb-4">
              <FiCheckCircle className="h-6 w-6 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Password Reset Sent</h2>
            <p className="text-gray-400 mb-4">
              We've sent a password reset link to <span className="text-amber-400">{email}</span>.
            </p>
            
            {!showTroubleshoot ? (
              <>
                <button
                  onClick={() => setShowTroubleshoot(true)}
                  className="text-sm text-amber-400 hover:underline mb-6"
                >
                  Didn't receive the email?
                </button>
                <button
                  onClick={() => router.push('/login')}
                  className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-amber-500/20 hover:-translate-y-0.5"
                >
                  <span>Return to Login</span>
                  <FiArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </>
            ) : (
              <div className="text-left">
                <div className="bg-gray-700/50 p-4 rounded-lg mb-6">
                  <h3 className="font-medium text-white mb-2 flex items-center">
                    <FiAlertCircle className="mr-2 text-amber-400" />
                    Troubleshooting Tips
                  </h3>
                  <ul className="text-sm text-gray-300 space-y-2 list-disc pl-5">
                    <li>Check your spam or junk folder</li>
                    <li>Verify you entered the correct email address</li>
                    <li>Wait a few minutes - emails may take time to arrive</li>
                    <li>Add noreply@localeats.com to your contacts</li>
                  </ul>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleResend}
                    disabled={isLoading}
                    className="flex-1 py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition flex items-center justify-center"
                  >
                    {isLoading ? (
                      <FiRefreshCw className="animate-spin mr-2" />
                    ) : null}
                    Resend Email
                  </button>
                  <button
                    onClick={() => router.push('/login')}
                    className="flex-1 py-2 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-lg transition"
                  >
                    Back to Login
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4 sm:p-6">
      <div className="w-full max-w-md bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-amber-500/10 to-amber-600/20 p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pattern-dots pattern-gray-600 pattern-size-4" />
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-amber-400 mb-2 tracking-tight">𝓛𝓸𝓬𝓪𝓵𝓔𝓪𝓽𝓮𝓼</h1>
            <p className="text-gray-300">Reset your password</p>
            <div className="h-1 w-16 bg-amber-500 mx-auto mt-4 rounded-full" />
          </div>
        </div>

        {/* Form Section */}
        <div className="p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Forgot Password</h2>
          <p className="text-gray-400 text-sm mb-6 text-center">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  className={`w-full pl-10 pr-4 py-3 bg-gray-700/70 border ${errors.email ? 'border-red-500' : 'border-gray-600/50'} rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200`}
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            {errors.submit && (
              <div className="p-3 bg-red-900/50 border border-red-700 text-red-300 rounded-lg text-sm">
                {errors.submit}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                isLoading ? 'opacity-90' : 'hover:shadow-amber-500/20 hover:-translate-y-0.5'
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Sending Link...</span>
                </>
              ) : (
                <>
                  <span>Send Reset Link</span>
                  <FiArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Remember your password?{' '}
              <a href="/login" className="text-amber-400 hover:underline font-medium">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
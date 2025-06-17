"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid email format";
    if (!form.password) newErrors.password = "Password is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Show success animation before redirect to shops page
      await new Promise(resolve => setTimeout(resolve, 800));
      router.push('/shops');
    } catch (error) {
      setErrors({ ...errors, submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4 sm:p-6">
      <div className="w-full max-w-md bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-amber-500/10 to-amber-600/20 p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pattern-dots pattern-gray-600 pattern-size-4" />
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-amber-400 mb-2 tracking-tight">𝓛𝓸𝓬𝓪𝓵𝓔𝓪𝓽𝓮𝓼</h1>
            <p className="text-gray-300">Discover local flavors near you</p>
            <div className="h-1 w-16 bg-amber-500 mx-auto mt-4 rounded-full" />
          </div>
        </div>

        {/* Form Section */}
        <div className="p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign In to Your Account</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
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
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`w-full pl-10 pr-10 py-3 bg-gray-700/70 border ${errors.password ? 'border-red-500' : 'border-gray-600/50'} rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200`}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => setForm({...form, password: e.target.value})}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-amber-400 transition" />
                    ) : (
                      <FiEye className="h-5 w-5 text-gray-400 hover:text-amber-400 transition" />
                    )}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-600 rounded bg-gray-700"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="/forget" className="font-medium text-amber-400 hover:text-amber-300">
                  Forgot password?
                </a>
              </div>
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
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <FiArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Don&apos;t have an account?{' '}
              <a href="/signup" className="text-amber-400 hover:underline font-medium">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
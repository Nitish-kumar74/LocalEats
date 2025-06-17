"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff, FiUser, FiMail, FiLock, FiArrowRight } from "react-icons/fi";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const router = useRouter();

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid email format";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords must match";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setForm({...form, password: value});
    setPasswordStrength(checkPasswordStrength(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      // Show success animation before redirect
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/login');
    } catch (error) {
      setErrors({ ...errors, submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    switch(passwordStrength) {
      case 0: return "bg-gray-600";
      case 1: return "bg-red-500";
      case 2: return "bg-yellow-500";
      case 3: return "bg-blue-500";
      case 4: return "bg-green-500";
      default: return "bg-gray-600";
    }
  };

  const getPasswordStrengthText = () => {
    switch(passwordStrength) {
      case 0: return "Very Weak";
      case 1: return "Weak";
      case 2: return "Moderate";
      case 3: return "Strong";
      case 4: return "Very Strong";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4 sm:p-6">
      <div className="w-full max-w-4xl bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden flex flex-col md:flex-row transform transition-all duration-300 hover:shadow-2xl">
        {/* Left Side - Branding/Image */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-amber-500/10 to-amber-600/20 p-8 hidden md:flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pattern-dots pattern-gray-600 pattern-size-4" />
          <div className="relative z-10 text-center">
            <h1 className="text-4xl font-bold text-amber-400 mb-3 tracking-tight">𝓛𝓸𝓬𝓪𝓵𝓔𝓪𝓽𝓮𝓼</h1>
            <p className="text-gray-300 text-lg mb-6">Discover local flavors near you</p>
            <div className="h-1 w-16 bg-amber-500 mx-auto mb-6 rounded-full" />
            <p className="text-gray-400 text-sm max-w-xs mx-auto leading-relaxed">
              Join our community of food enthusiasts and explore the best local dining experiences.
            </p>
          </div>
          <div className="absolute bottom-6 left-0 right-0 text-center">
            <p className="text-xs text-gray-500">Already a member? <a href="/login" className="text-amber-400 hover:underline transition">Sign in</a></p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-10">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Create Your Account</h2>
            <p className="text-gray-400">Join us in just a few steps</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    className={`w-full pl-10 pr-4 py-3 bg-gray-700/70 border ${errors.name ? 'border-red-500' : 'border-gray-600/50'} rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200`}
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    className={`w-full pl-10 pr-4 py-3 bg-gray-700/70 border ${errors.email ? 'border-red-500' : 'border-gray-600/50'} rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200`}
                    placeholder="you@example.com"
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
                    value={form.password}
                    onChange={handlePasswordChange}
                    className={`w-full pl-10 pr-10 py-3 bg-gray-700/70 border ${errors.password ? 'border-red-500' : 'border-gray-600/50'} rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200`}
                    placeholder="••••••••"
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
                {form.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-400">Password strength:</span>
                      <span className={`text-xs font-medium ${getPasswordStrengthColor().replace('bg', 'text')}`}>
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${getPasswordStrengthColor()} transition-all duration-300`}
                        style={{ width: `${(passwordStrength / 4) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
                    className={`w-full pl-10 pr-10 py-3 bg-gray-700/70 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-600/50'} rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-amber-400 transition" />
                    ) : (
                      <FiEye className="h-5 w-5 text-gray-400 hover:text-amber-400 transition" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-600 rounded bg-gray-700"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                I agree to the <a href="#" className="text-amber-400 hover:underline">Terms of Service</a> and <a href="#" className="text-amber-400 hover:underline">Privacy Policy</a>
              </label>
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
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Sign Up</span>
                  <FiArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center md:hidden">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
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
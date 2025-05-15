import { Link } from "react-router-dom";
import { SignUpForm } from "../../components/auth/Sign-up-form";


export default function SignUpPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left side - CTA */}
      <div className="w-1/2 bg-[#0a3d62] flex flex-col items-center justify-center p-8 text-white relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-20 right-20 w-20 h-20 bg-[#1e5b8d] rotate-45 opacity-50"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 rounded-full bg-[#1e5b8d] opacity-30"></div>
        <div className="absolute bottom-1/3 right-0 w-40 h-40 bg-[#1e5b8d] rotate-45 opacity-20 translate-x-1/4"></div>

        <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
        <p className="text-center mb-8 max-w-xs">To keep connected with us please login with your personal info</p>

        <Link
          to="/login"
          className="border-2 border-white text-white hover:bg-white hover:text-[#0a3d62] px-8 py-2 rounded-full transition-colors font-medium"
        >
          SIGN IN
        </Link>
      </div>

      {/* Right side - Sign Up Form */}
      <div className="w-1/2 flex items-center justify-center p-8 bg-white">
        <SignUpForm />
      </div>
    </div>
  )
}

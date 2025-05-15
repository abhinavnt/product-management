import { Link } from "react-router-dom";
import { SignInForm } from "../../components/auth/Sign-in-form";


export default function SignInPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Sign In Form */}
      <div className="w-1/2 flex items-center justify-center p-8 bg-white">
        <SignInForm />
      </div>

      {/* Right side - CTA */}
      <div className="w-1/2 bg-[#0a3d62] flex flex-col items-center justify-center p-8 text-white relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-20 right-20 w-20 h-20 bg-[#1e5b8d] rotate-45 opacity-50"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 rounded-full bg-[#1e5b8d] opacity-30"></div>
        <div className="absolute top-1/2 right-0 w-40 h-40 bg-[#1e5b8d] rotate-45 opacity-20 -translate-y-1/2 translate-x-1/4"></div>

        <h2 className="text-3xl font-bold mb-4">Hello Friend!</h2>
        <p className="text-center mb-8 max-w-xs">Enter your personal details and start your journey with us</p>

        <Link
          to="/signUp"
          className="border-2 border-white text-white hover:bg-white hover:text-[#0a3d62] px-8 py-2 rounded-full transition-colors font-medium"
        >
          SIGN UP
        </Link>
      </div>
    </div>
  )
}

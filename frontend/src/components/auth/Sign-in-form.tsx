
import { useState } from "react"
import { z } from "zod"

import { EmailIcon, PasswordIcon } from "./Auth-icons"
import { AuthForm } from "./Auth-form"
import { Link, useNavigate } from "react-router-dom"
import { login } from "@/services/authService"
import { useDispatch } from "react-redux"

// Validation schemas
const emailSchema = z.string().email("Please enter a valid email address")
const passwordSchema = z.string().min(6, "Password must be at least 6 characters")

export function SignInForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | undefined>()

    const dispactch = useDispatch()

    const navigate = useNavigate()

    const handleSignIn = async (data: Record<string, string>) => {
        setIsSubmitting(true)
        setError(undefined)

        try {
            // Make API call to sign in
            const response = await login(data.email, data.password, dispactch)

            if (response?.status !== 200 && response?.status !== 201) {
                const errorData = response?.data
                throw new Error(errorData?.message || "Failed to sign in")
            }

            navigate("/")

        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred during sign in")
        } finally {
            setIsSubmitting(false)
        }
    }

    const fields = [
        {
            name: "email",
            type: "email",
            placeholder: "Email",
            icon: <EmailIcon />,
            validation: emailSchema,
        },
        {
            name: "password",
            type: "password",
            placeholder: "Password",
            icon: <PasswordIcon />,
            validation: passwordSchema,
        },
    ]

    return (
        <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold text-[#f5a623] mb-8 text-center">Sign In to Your Account</h1>

            <AuthForm
                fields={fields}
                onSubmit={handleSignIn}
                submitText="SIGN IN"
                isSubmitting={isSubmitting}
                error={error}
            />

            <div className="mt-4 text-center">
                <Link to="/forgot-password" className="text-sm text-gray-600 hover:text-gray-800">
                    forgot password?
                </Link>
            </div>
        </div>
    )
}

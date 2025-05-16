
import { useState } from "react"
import { z } from "zod"

import { EmailIcon, PasswordIcon, UserIcon } from "./Auth-icons"
import { AuthForm } from "./Auth-form"
import { registerUser } from "../../services/authService"
import { useNavigate } from "react-router-dom"


// Validation schemas
const nameSchema = z.string().min(2, "Name must be at least 2 characters")
const emailSchema = z.string().email("Please enter a valid email address")
const passwordSchema = z.string().min(6, "Password must be at least 6 characters")

export function SignUpForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const navigate = useNavigate()

  const handleSignUp = async (data: Record<string, string>) => {
    setIsSubmitting(true)
    setError(undefined)

    try {
      // Make API call to sign up
      const response = await registerUser(data.name, data.email, data.password)

      if (response?.status !== 200 && response?.status !== 201) {
        const errorData = response?.data
        throw new Error(errorData?.message || "Failed to sign up")
      }
      // Redirect to home page
      navigate("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during sign up")
    } finally {
      setIsSubmitting(false)
    }
  }

  const fields = [
    {
      name: "name",
      type: "text",
      placeholder: "Name",
      icon: <UserIcon />,
      validation: nameSchema,
    },
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
      <h1 className="text-3xl font-bold text-[#f5a623] mb-8 text-center">Create Account</h1>

      <AuthForm
        fields={fields}
        onSubmit={handleSignUp}
        submitText="SIGN UP"
        isSubmitting={isSubmitting}
        error={error}
      />
    </div>
  )
}

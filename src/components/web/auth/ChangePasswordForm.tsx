"use client"
import { changePassword } from "@/app/actions/web/auth/webAuth"
import { useAuth } from "@/context/AuthContext"
import { useState } from "react"

const ChangePasswordForm = () => {

      const { userEmail, closeAuth } = useAuth()
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }
        setIsLoading(true)
        setError('')

        try {
            const result = await changePassword(userEmail, password)

            if (result.success) {
                // Close the modal and refresh to update auth state
                closeAuth()
                window.location.reload()
            } else {
                setError(result.error || 'Failed to change password')
            }
        }catch (err) {
            setError('An unexpected error occurred')
          } finally {
            setIsLoading(false)
          }
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-md border p-2"
                    required
                />
            </div>
            <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirm Password
                </label>
                <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-md border p-2"
                    required
                />
            </div>
            <button
                type="submit"
                disabled={isLoading}
                className="bg-primary hover:bg-primary-dark w-full rounded-md py-2 text-white transition"
            >
                {isLoading ? 'Changing Password...' : 'Change Password'}
            </button>
        </form>
    )
}

export default ChangePasswordForm
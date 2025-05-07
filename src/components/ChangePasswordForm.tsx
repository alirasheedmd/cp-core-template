"use client"
import { changePassword } from "@/app/actions/admin/auth/changePassword"
import { useState } from "react"

interface ChangePasswordFormProps {
    resetPasswordToken: string
}
const ChangePasswordForm = ({resetPasswordToken}: ChangePasswordFormProps) => {

    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [message, setMessage] = useState<string>("")

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            setMessage("Passwords do not match")
            return
        }
        const message = await changePassword(resetPasswordToken, password)

        setMessage(message)

    }
    return (
        <div>
            <h1>Change Password</h1>
            <input type="password" placeholder="Passwrd" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="password" placeholder="Confirm Passwrd" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <button onClick={handleSubmit}>
                Change Password
            </button>
            <p>{message}</p>
        </div>
    )
}

export default ChangePasswordForm
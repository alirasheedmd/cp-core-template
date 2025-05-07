"use server"

import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { getUserByEmail } from "@/lib/dal"
import crypto from 'crypto'
import { sendEmail } from "../email/email"
import ResetPasswordEmailTemplate from "@/email-templates/reset-password-email"

export const resetPassword = async (email: string) => {
    console.log("Resetting password for " + email)

    const user = await getUserByEmail(email)

    if (!user) {
        throw new Error('User not found')
    }

    const resetPasswordToken = crypto.randomBytes(32).toString("base64url")
    const today = new Date()
    const expiryDate = new Date(today.setDate(today.getDate() + 1)) // 24 hours from now

    await db.update(users).set({
        resetPasswordToken: resetPasswordToken,
        resetPasswordTokenExpiry: expiryDate
    }).where(eq(users.id,user.id))

    await sendEmail({
        from: 'Your Store <noreply@paklitz.com>',
        to: [email],
        subject: 'Reset your password',
        react: ResetPasswordEmailTemplate({email, resetPasswordToken}) as React.ReactElement
    })
    
    return "Password reset email sent"
}
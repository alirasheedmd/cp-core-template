"use server"
import { db } from "@/db"
import { users } from "@/db/schema"
import { hashPassword } from "@/lib/auth"
import { eq } from "drizzle-orm"

 

export const changePassword = async (resetPasswordToken: string, password: string) => {
    const user = await db.query.users.findFirst({
        where: ( (users, { eq }) =>eq(users.resetPasswordToken, resetPasswordToken ) )
    })
    if (!user) {
        throw new Error("User not found")
    }

    const resetPasswordTokenExpiry = user.resetPasswordTokenExpiry
    if (!resetPasswordTokenExpiry) {
        throw new Error('Token expired')
    }

    const today = new Date()

    if (today > resetPasswordTokenExpiry) {
        throw new Error('Token expired')
    }

    // Hash the password
    const hashedPassword = await hashPassword(password)
    
    await db.update(users).set({
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordTokenExpiry: null
    }).where(eq(users.id, user.id))

    return "Password changed successfully"
}
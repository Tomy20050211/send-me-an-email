import { NextResponse } from "next/server";
import { transporter } from "@/src/lib/nodemailer";

export async function POST() {

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: "",
        subject: "Hola desde Next",
        text: "Correo enviado correctamente"
    })
}
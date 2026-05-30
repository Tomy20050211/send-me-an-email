import { NextResponse } from "next/server";
import { transporter } from "@/src/lib/nodemailer";
import type { EmailData } from "@/src/types/interfaces/email";

export const runtime = "nodejs";

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const isAuthError = (error: unknown) =>
  typeof error === "object" &&
  error !== null &&
  "code" in error &&
  error.code === "EAUTH";

const buildEmailTemplate = ({ name, email, subject, message }: EmailData) => {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");
  const initial = safeName.charAt(0).toUpperCase();

  return `
    <div style="margin:0;padding:0;background:#eef2f7;font-family:Arial,Helvetica,sans-serif;color:#111827;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#eef2f7;">
        <tr>
          <td align="center" style="padding:44px 16px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;border-collapse:collapse;">
              <tr>
                <td style="padding:0 0 14px;">
                  <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.5;text-align:center;letter-spacing:.16em;text-transform:uppercase;font-weight:700;">Thomas Salazar</p>
                </td>
              </tr>
              <tr>
                <td style="background:#111827;border-radius:24px 24px 0 0;padding:36px 34px 30px;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                    <tr>
                      <td>
                        <p style="margin:0 0 12px;color:#a7f3d0;font-size:13px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;">Nuevo mensaje recibido</p>
                        <h1 style="margin:0;color:#ffffff;font-size:30px;line-height:1.22;font-weight:800;">${safeSubject}</h1>
                      </td>
                      <td align="right" width="72" style="vertical-align:top;">
                        <div style="width:56px;height:56px;border-radius:18px;background:#10b981;color:#ffffff;font-size:24px;font-weight:800;line-height:56px;text-align:center;">${initial}</div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="background:#ffffff;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;padding:30px 34px 8px;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                    <tr>
                      <td style="padding:0 0 20px;">
                        <p style="margin:0 0 8px;color:#6b7280;font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;">Remitente</p>
                        <table role="presentation" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                          <tr>
                            <td style="padding:0 14px 0 0;">
                              <div style="width:48px;height:48px;border-radius:16px;background:#ecfdf5;color:#047857;font-size:20px;font-weight:800;line-height:48px;text-align:center;">${initial}</div>
                            </td>
                            <td>
                              <p style="margin:0;color:#111827;font-size:18px;line-height:1.35;font-weight:800;">${safeName}</p>
                              <p style="margin:3px 0 0;color:#4b5563;font-size:15px;line-height:1.5;">${safeEmail}</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="background:#ffffff;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;padding:0 34px 34px;">
                  <div style="border:1px solid #d1fae5;background:#f0fdf4;border-radius:18px;padding:26px;">
                    <p style="margin:0 0 14px;color:#047857;font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;">Mensaje</p>
                    <p style="margin:0;color:#1f2937;font-size:17px;line-height:1.8;">${safeMessage}</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="background:#ffffff;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;padding:0 34px 34px;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#f9fafb;border:1px solid #e5e7eb;border-radius:16px;">
                    <tr>
                      <td style="padding:18px 20px;">
                        <p style="margin:0;color:#374151;font-size:14px;line-height:1.7;">Puedes responder directamente a este correo: la respuesta ira al email que dejo ${safeName}.</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="background:#111827;border-radius:0 0 24px 24px;padding:22px 34px;">
                  <p style="margin:0;color:#d1d5db;font-size:13px;line-height:1.6;text-align:center;">Enviado desde el formulario de <strong style="color:#ffffff;">Thomas Salazar</strong>.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `;
};

export async function POST(request: Request) {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return NextResponse.json(
        { message: "Faltan EMAIL_USER o EMAIL_PASS en el archivo .env.local." },
        { status: 500 },
      );
    }

    const data = (await request.json()) as Partial<EmailData>;
    const name = data.name?.trim() ?? "";
    const email = data.email?.trim() ?? "";
    const subject = data.subject?.trim() ?? "";
    const message = data.message?.trim() ?? "";

    if (
      name.length < 2 ||
      !isValidEmail(email) ||
      subject.length < 3 ||
      message.length < 10
    ) {
      return NextResponse.json(
        { message: "Revisa los campos del formulario antes de enviarlo." },
        { status: 400 },
      );
    }

    const payload: EmailData = { name, email, subject, message };
    const destination = process.env.EMAIL_TO ?? process.env.EMAIL_USER;

    await transporter.sendMail({
      from: `"Thomas Salazar" <${process.env.EMAIL_USER}>`,
      to: destination,
      replyTo: `"${name}" <${email}>`,
      subject: `Nuevo mensaje: ${subject}`,
      text: `De: ${name} <${email}>\nAsunto: ${subject}\n\n${message}`,
      html: buildEmailTemplate(payload),
    });

    return NextResponse.json({ message: "Correo enviado correctamente." });
  } catch (error) {
    console.error(error);

    if (isAuthError(error)) {
      return NextResponse.json(
        {
          message:
            "Gmail rechazo las credenciales. Revisa EMAIL_USER y usa una contrasena de aplicacion de Google de 16 caracteres.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "No se pudo enviar el correo. Intentalo nuevamente." },
      { status: 500 },
    );
  }
}

import { EmailData } from "../types/interfaces/email";

export const sendEmail = async (data: EmailData) => {
  const response = await fetch("/api/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message ?? "No se pudo enviar el correo.");
  }

  return response.json();
};

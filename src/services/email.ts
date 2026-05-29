import { EmailData } from "../types/interfaces/email";

export const sendEmail = async (data: EmailData) => {

  const response = await fetch("/api/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return response.json();
};
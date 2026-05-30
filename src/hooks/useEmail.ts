"use client";

import { useState } from "react";
import { sendEmail } from "../services/email";

export const useEmail = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      await sendEmail({
        name,
        email,
        subject,
        message,
      });

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setStatus("success");
      setFeedback("Listo. Tu correo fue enviado correctamente.");
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Algo salio mal al enviar el correo.",
      );
    }
  };

  return {
    name,
    email,
    subject,
    message,
    status,
    feedback,
    setName,
    setEmail,
    setSubject,
    setMessage,
    handleSubmit,
  };
};

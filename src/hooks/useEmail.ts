'use client'

import { useState } from "react";
import { sendEmail } from "../services/email";

export const useEmail = () => {

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    try {

      await sendEmail({
        name,
        message
      });

      console.log("Correo enviado");

      setName("");
      setMessage("");

    } catch (error) {

      console.log(error);
    }
  };

  return {
    name,
    message,
    setName,
    setMessage,
    handleSubmit
  };
};

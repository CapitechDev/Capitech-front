"use client";

import emailjs from "@emailjs/browser";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { HiCheckCircle } from "react-icons/hi";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const form = useRef<HTMLFormElement | null>(null);

  const serviceID = process.env.NEXT_PUBLIC_SERVICE_ID;
  const templateID = process.env.NEXT_PUBLIC_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.current || !serviceID || !templateID || !publicKey) {
      setError(true);
      return;
    }

    setLoading(true);
    setError(false);

    emailjs.sendForm(serviceID, templateID, form.current, publicKey).then(
      () => {
        form.current?.reset();
        setSuccess(true);
        setLoading(false);
        setTimeout(() => {
          setSuccess(false);
        }, 10 * 1000);
      },
      (error: Error) => {
        // console.error("Erro ao enviar email:", error);
        setError(true);
        setLoading(false);
      }
    );
  };

  return (
    <>
      <section className="relative bg-capi_gray_contact flex items-center justify-center gap-8 p-8">
        <img
          alt="Ícone de contato."
          className="hidden absolute left-28 w-16 sm:block"
          src="/assets/contact/contactIcon.png"
        />
        <h2 className="font-headline font-semibold text-white text-4xl">
          Contato
        </h2>
      </section>
      <section className="container mx-auto max-w-5xl p-10 px-2">
        <h3 className="text-center font-headline font-semibold text-2xl">
          Nos envie uma mensagem:
        </h3>
        <form
          ref={form}
          data-testid="contact-form"
          className="mt-12 flex flex-col items-center gap-8"
          onSubmit={sendEmail}
        >
          <div className="w-full flex flex-col gap-2 sm:w-2/3">
            <Input
              data-testid="input-Nome"
              required
              className="w-full"
              color="default"
              label="Nome"
              labelPlacement="outside"
              type="text"
              name="name"
              value={name}
              variant="faded"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="w-full flex flex-col gap-2 sm:w-2/3">
            <Input
              data-testid="input-E-Mail"
              required
              className="w-full"
              label="E-Mail"
              labelPlacement="outside"
              name="email"
              type="email"
              value={email}
              variant="faded"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="w-full flex flex-col gap-2 sm:w-2/3">
            <Input
              data-testid="input-Assunto"
              required
              className="w-full"
              label="Assunto"
              labelPlacement="outside"
              name="subject"
              type="text"
              value={subject}
              variant="faded"
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="w-full flex flex-col gap-2 sm:w-2/3">
            <Textarea
              data-testid="textarea-Mensagem"
              disableAnimation
              disableAutosize
              required
              className="w-full"
              id="message"
              label="Mensagem"
              labelPlacement="outside"
              name="message"
              rows={6}
              value={text}
              variant="faded"
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <Button
            data-testid="submit-button"
            className="capiButtons flex items-center gap-2 text-white font-bold bg-capi_blue hover:bg-blue-400 shadow-xl"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <FaSpinner className="h-4 w-4 animate-spin" />
            ) : success ? (
              <HiCheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              "Enviar"
            )}
          </Button>

          {error && (
            <p data-testid="error-message" className="font-bold text-red-600">
              Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.
            </p>
          )}

          {success && (
            <p
              data-testid="success-message"
              className="font-bold text-green-600"
            >
              Mensagem enviada com sucesso!
            </p>
          )}
        </form>
      </section>
    </>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/common/TextInput";
import { PasswordInput } from "@/components/common/PasswordInput";
import { SectionTitle } from "@/components/common/SectionTitle";
import { useRouter } from "next/navigation";
import { callApi } from "@/lib/callApi";

export function CreateUserForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [registration, setRegistration] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [touched, setTouched] = useState({
    name: false,
    registration: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  function markTouched(field: keyof typeof touched) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const errors = {
    name: !name.trim()
      ? "Campo obrigatório"
      : !/^[\p{L}\s]+$/u.test(name)
      ? "Apenas letras são permitidas"
      : name.length > 30
      ? "Máximo de 30 caracteres"
      : "",
    registration: !registration.trim()
      ? "Campo obrigatório"
      : !/^\d+$/.test(registration)
      ? "Apenas números são permitidos"
      : "",
    email: !email.trim()
      ? "Campo obrigatório"
      : !EMAIL_REGEX.test(email)
      ? "E-mail inválido"
      : email.length > 40
      ? "Máximo de 40 caracteres"
      : "",
    password: !password
      ? "Campo obrigatório"
      : !/^[a-zA-Z0-9]{6}$/.test(password)
      ? "A senha deve ter exatamente 6 dígitos alfanuméricos"
      : "",
    confirmPassword: !confirmPassword
      ? "Campo obrigatório"
      : confirmPassword !== password
      ? "As senhas não coincidem"
      : "",
  };

  const isFormValid = Object.values(errors).every((e) => e === "");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setTouched({
      name: true,
      registration: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    if (!isFormValid) return;
    
    const {error} = await callApi<null>("/api/users", {
      method: "POST",
      body: {
        name,
        registration,
        email,
        password,
      },
    });

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/users");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-4 bg-white rounded-md">
      <section className="space-y-4">
        <SectionTitle title="Dados do Usuário" />

        <div className="grid grid-cols-2 gap-x-6">
          <TextInput
            id="name"
            label="Nome Completo *"
            placeholder="Insira o nome completo*"
            value={name}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || /^[\p{L}\s]+$/u.test(value)) setName(value);
            }}
            onBlur={() => markTouched("name")}
            error={touched.name ? errors.name : undefined}
            maxLength={30}
            currentLength={name.length}
          />

          <TextInput
            id="registration"
            label="Nº da Matrícula *"
            placeholder="Insira o Nº da matrícula*"
            value={registration}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || /^\d+$/.test(value)) setRegistration(value);
            }}
            onBlur={() => markTouched("registration")}
            error={touched.registration ? errors.registration : undefined}
          />

          <div className="col-span-2">
            <TextInput
              id="email"
              label="E-mail *"
              type="email"
              placeholder="Insira o e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => markTouched("email")}
              error={touched.email ? errors.email : undefined}
              maxLength={40}
              currentLength={email.length}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <SectionTitle title="Dados de acesso" />

        <div className="grid grid-cols-2 gap-x-6">
          <PasswordInput
            id="password"
            label="Senha *"
            placeholder="Insira a senha"
            value={password}
            maxLength={6}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || /^[a-zA-Z0-9]*$/.test(value)) setPassword(value);
            }}
            onBlur={() => markTouched("password")}
            error={touched.password ? errors.password : undefined}
          />

          <PasswordInput
            id="confirmPassword"
            label="Repetir Senha *"
            placeholder="Repita a senha"
            value={confirmPassword}
            maxLength={6}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || /^[a-zA-Z0-9]*$/.test(value)) setConfirmPassword(value);
            }}
            onBlur={() => markTouched("confirmPassword")}
            error={touched.confirmPassword ? errors.confirmPassword : undefined}
          />
        </div>
      </section>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="link" className="border rounded-md cursor-pointer" onClick={() => router.push("/users")}>
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={!isFormValid}
          className="bg-brand hover:bg-brand/90 text-white"
        >
          Cadastrar
        </Button>
      </div>
    </form>
  );
}

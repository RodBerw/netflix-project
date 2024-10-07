"use client";

import LoginWrapper from "@/components/LoginWrapper";
import api from "@/utils/configAxios";
import { validateEmail, validatePassword } from "@/utils/validation";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [emailInput, setEmailInput] = useState({
    value: "",
    isValid: false,
    message: "",
  });
  const [passwordInput, setPasswordInput] = useState({
    value: "",
    isValid: false,
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [notification, setNotification] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (emailInput.isValid && passwordInput.isValid) {
      api
        .post("/api/login", {
          email: emailInput.value,
          password: passwordInput.value,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userId", res.data.userId);
          router.push("/");
        })
        .catch((err) => {
          if (err.response.status === 404) {
            setNotification("User not found");
          } else if (err.response.status === 401) {
            setNotification("Invalid password");
          }
          console.error(err);
        });
    } else {
      setSubmitted(true);
      console.log("Invalid form");
    }
  };

  return (
    <LoginWrapper>
      <h1 className="mb-7 text-4xl font-bold">Login</h1>
      <p className="text-red-500">{notification}</p>
      <form
        className="flex flex-col gap-4 items-center"
        onSubmit={handleSubmit}
      >
        <Input
          classNames={{ inputWrapper: ["bg-gray-900", "bg-opacity-30"] }}
          type="email"
          variant="faded"
          radius="sm"
          label="Email"
          onValueChange={(e) => {
            setEmailInput(validateEmail(e));
          }}
          isInvalid={
            !emailInput.isValid && (emailInput.value != "" || submitted)
          }
          errorMessage={emailInput.message}
        />
        <Input
          classNames={{ inputWrapper: ["bg-gray-900", "bg-opacity-30"] }}
          className="input"
          type="password"
          variant="faded"
          radius="sm"
          label="Password"
          onValueChange={(e) => {
            setPasswordInput(validatePassword(e));
          }}
          isInvalid={
            !passwordInput.isValid && (passwordInput.value != "" || submitted)
          }
          errorMessage={passwordInput.message}
        />
        <Button
          className="w-full bg-secondary text-primary font-bold"
          variant="flat"
          radius="sm"
          color="default"
          type="submit"
        >
          Login
        </Button>
        <a href="/" className="text-primary hover:underline">
          Forgot your password?
        </a>
        <h1 className="from-neutral-50">OR</h1>
        <Button
          className="w-full bg-secondary text-primary font-bold"
          href="/"
          variant="flat"
          radius="sm"
          color="default"
          onClick={() => router.push("/register")}
        >
          Sign Up
        </Button>
      </form>
    </LoginWrapper>
  );
}

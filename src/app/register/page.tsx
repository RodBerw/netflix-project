"use client";

import LoginWrapper from "@/components/LoginWrapper";
import api from "@/utils/configAxios";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "@/utils/validation";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const router = useRouter();
  const [usernameInput, setUsernameInput] = useState({
    value: "",
    isValid: false,
    message: "",
  });
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
  const [confirmPasswordInput, setConfirmPasswordInput] = useState({
    value: "",
    isValid: false,
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (
      usernameInput.isValid &&
      emailInput.isValid &&
      passwordInput.isValid &&
      passwordInput.value === confirmPasswordInput.value
    ) {
      api
        .post("/api/user", {
          name: usernameInput.value,
          email: emailInput.value,
          password: passwordInput.value,
        })
        .then((res) => {
          if (res.status === 201) {
            api
              .post("/api/login", {
                email: emailInput.value,
                password: passwordInput.value,
              })
              .then((res) => {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userId", res.data.userId);
                router.push("/");
              });
            router.push("/");
          }
        })
        .catch((err) => {
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
      <form
        className="flex flex-col gap-4 items-center"
        onSubmit={handleSubmit}
      >
        <Input
          classNames={{ inputWrapper: ["bg-gray-900", "bg-opacity-30"] }}
          type="username"
          variant="faded"
          radius="sm"
          label="Username"
          onValueChange={(e) => {
            setUsernameInput(validateUsername(e));
          }}
          isInvalid={
            !usernameInput.isValid && (usernameInput.value != "" || submitted)
          }
          errorMessage={usernameInput.message}
        />
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
        <Input
          classNames={{ inputWrapper: ["bg-gray-900", "bg-opacity-30"] }}
          className="input"
          type="password"
          variant="faded"
          radius="sm"
          label="Password"
          onValueChange={(e) => {
            setConfirmPasswordInput(validatePassword(e));
          }}
          isInvalid={
            !confirmPasswordInput.isValid &&
            (confirmPasswordInput.value != "" || submitted)
          }
          errorMessage={
            confirmPasswordInput.value == passwordInput.value
              ? confirmPasswordInput.message
              : "Passwords do not match"
          }
        />
        <Button
          className="w-full bg-secondary text-primary font-bold"
          variant="flat"
          radius="sm"
          color="default"
          type="submit"
        >
          Register
        </Button>
        <a href="/login" className="text-primary hover:underline">
          Already have an account? Login
        </a>
      </form>
    </LoginWrapper>
  );
}

"use client";

import { validateEmail, validatePassword } from "@/utils/validation";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";

export default function Login(){
    const [emailInput, setEmailInput] = useState({value: "", isValid: false, message: ""});
    const [passwordInput, setPasswordInput] = useState({value: "", isValid: false, message: ""});

    return (
        <div className="w-full h-full flex items-center justify-center" style={{backgroundImage: "url('/images/netflix-login-bg.jpg')"}}>
            <div className="w-full max-w-md flex flex-col pt-12 pr-16 pb-12 pl-16 bg-black bg-opacity-70 h-fit">
                <h1 className="mb-7 text-4xl font-bold">Login</h1>
                <form className="flex flex-col gap-4 items-center">
                    <Input classNames={{inputWrapper:["bg-gray-900", "bg-opacity-30"]}} type="email" variant="faded" radius="sm" label="Email" onValueChange={(e) => setEmailInput(validateEmail(e))}
                    isInvalid={!emailInput.isValid && emailInput.value != ""} errorMessage={emailInput.message} />
                    <Input classNames={{inputWrapper:["bg-gray-900", "bg-opacity-30"]}} className="input" type="password" variant="faded" radius="sm" label="Password" onValueChange={(e) => setPasswordInput(validatePassword(e))}
                    isInvalid={!passwordInput.isValid && passwordInput.value != ""} errorMessage={passwordInput.message}/>
                    <Button className="w-full bg-secondary text-primary font-bold" variant="flat" radius="sm" color="default" type="submit">Login</Button>
                </form>
            </div>
        </div>
    )
}
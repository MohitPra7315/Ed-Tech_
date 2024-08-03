import React from "react";
import { Template } from "../Components/Cores/Auth/Template";
import  login  from '../assets/Images/login.webp'

export function LoginPage() {
    return (
        <Template
            title="Welcome Back  "
            desc1="Build skills for today ,tommor, and Beyond"
            desc2="Education to Future-Proof your Carrer"
            image={login}
            formtype='Login'
        ></Template>
    )
}
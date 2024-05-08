import React from "react";
import { Template } from "../Components/Cores/Auth/Template";
import  signUp  from '../assets/Images/signup.webp'

export function SignupPage() {
    return (
        <Template
            title="Welcome Back  "
            desc1="Build skills for today ,tommor, and Beyond"
            desc2="Education to Future-Proof your Carrer"
            image={signUp}
            formtype='Signup'
        ></Template>
    )
}
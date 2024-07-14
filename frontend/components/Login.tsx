"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from 'axios';
import { BASE_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login: React.FC = () => {
    const router = useRouter();
    const [errorMsg, setErrorMsg] = useState('');
    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log("Logging in");

        const formData = new FormData(e.currentTarget);
        let email = "" ;
        let password = "";
        // Log form data entries
        for (let [key, value] of formData.entries()) {
            if(key.includes("email")){
                email = value.toString();
            }
            else {
                password = value.toString();            
            }
        }
        if(email && password){

        try {
            const response = await axios.post(`${BASE_URL}/api/user/login`, {
                email,
                password
            });
            if(response?.data?.success){
                localStorage.setItem("token", response.data.token);
                router.push('/dashboard');
            }                
        } catch (error) {
            setErrorMsg('Unable to Login. Please retry.');
        }

        }
    };

    return (
        <main className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="grid grid-cols-1 space-y-4 gap-4 w-96 max-w-lg">
                <form
                    onSubmit={login}
                    className="grid grid-cols-1 gap-4 border rounded-lg p-12 shadow-lg bg-white"
                >
                    <div>
                        <Label htmlFor="login_email">Email</Label>
                        <Input type="email" required placeholder="Please enter your email" id="login_email" name="email"/>
                    </div>
                    <div>
                        <Label htmlFor="login_password">Password</Label>
                        <Input type="password" required placeholder="Password here" id="login_password" name="password"/>
                    </div>
                    {errorMsg && 
                        <div className="text-red-500 font-medium p-4">
                            <p>{errorMsg}</p>
                        </div>
                    }
                    <Button type="submit">Login</Button>
                </form>
                <div className="border rounded-lg flex flex-col justify-center items-center space-y-4 w-full py-4 shadow-lg bg-white">
                    <p className="text-gray-400 font-medium">Not registered?</p>
                    <Link href="/register/user" className="border p-3 text-sm rounded-md bg-primary text-secondary font-medium">Get yourself Registered using a Library Code</Link>
                </div>
            </div>
        </main>
    );
};

export default Login;

// pages/student_register.tsx
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { BASE_URL } from "@/lib/constants";

const StudentRegister: React.FC = () => {
    const [error, setError] = useState<string | null>(null);

    const registerStudent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const studentId = formData.get("student_id") as string;
        const department = formData.get("department") as string;

        if (email && password && name && studentId && department) {
            try {
                const response = await axios.post(`${BASE_URL}/api/student/register`, {
                    email,
                    password,
                    name,
                    student_id: studentId,
                    department,
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response?.data?.success) {
                    console.log("Student registered successfully");
                    window.location.reload();
                }
            } catch (err) {
                setError("Error registering student");
                console.error(err);
            }
        } else {
            setError("Please fill in all fields");
        }
    };

    return (
        <main className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="grid grid-cols-1 space-y-4 gap-4 w-96 max-w-lg">
                <form
                    onSubmit={registerStudent}
                    className="grid grid-cols-1 gap-4 border rounded-lg p-12 shadow-lg bg-white"
                >
                    <div className="space-y-2">
                        <Label htmlFor="name" className="inline-block">
                            Name
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Enter name"
                            className="inline-block"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="inline-block">
                            Email
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter email"
                            className="inline-block"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="inline-block">
                            Password
                        </Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter password"
                            className="inline-block"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="student_id" className="inline-block">
                            Student ID
                        </Label>
                        <Input
                            id="student_id"
                            name="student_id"
                            placeholder="Enter student ID"
                            className="inline-block"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="department" className="inline-block">
                            Department
                        </Label>
                        <Input
                            id="department"
                            name="department"
                            placeholder="Enter department"
                            className="inline-block"
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <Button type="submit">Register Student</Button>
                </form>
            </div>
        </main>
    );
};

export default StudentRegister;

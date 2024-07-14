'use client'
import { BASE_URL } from "@/lib/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const router = useRouter();
    const [validated, setValidated] = useState(false);
    const [message, setMessage] = useState('Please wait while we verify your credentials');
    const [id , setID] = useState('');
    // const [validToken, setValidToken] = useState(true);
    const [role, setRole] = useState('');

    useEffect(() => {
        const validateTokenAndRole = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/user/profile`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming the token is stored in localStorage
                    }
                });
                console.log(response);
                if (response.status === 200) {
                    const responseRole = response?.data?.data?.role ;
                    if(responseRole === 'student'){
                        setRole('user');
                    }
                    else setRole(response?.data?.data?.role);
                    setID(response?.data?.data?._id);
                    setValidated(true);
                } else {
                    // Handle invalid token or other status codes
                    setMessage('Your token expired please login again');
                    setTimeout(()=>{
                        router.push('/login'); // 
                    },2000);
                }
            } catch (error) {
                setMessage('Unable to verify your role or login. Please retry.')
                setTimeout(()=>{
                    router.push('/login'); // 
                },2000);
            }
        };

        if (!validated) {
            validateTokenAndRole();
        }
    }, [validated, router]);

    if (validated && role !== '') {
        router.push(`/dashboard/${role.toLowerCase()}/${id}`);
    }

    if(!validated){
        <div>
            <p>{message}</p>
        </div>
    }
}

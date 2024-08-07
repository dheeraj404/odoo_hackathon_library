"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pagination } from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
import handleSignOut from "@/lib/signout";

const books = [
    {
        id: 1,
        title: "Modern Development Cookbooks",
        description:
            "Rapidly build, customize, and deploy applications using modern development techniques.",
        imageUrl : ''
    },
    {
        id: 2,
        title: "The Art of Clean Code",
        description:
            "Learn how to write maintainable, readable, and efficient code.",
        imageUrl : ''

    },
    {
        id: 3,
        title: "Data Structures and Algorithms",
        description:
            "A comprehensive guide to fundamental computer science concepts.",
    },
    {
        id: 4,
        title: "Machine Learning Basics",
        description:
            "An introduction to machine learning principles and practices.",
    },
    {
        id: 5,
        title: "Web Development with React",
        description: "Build modern, interactive web applications using React.",
    },
    {
        id: 6,
        title: "Python for Data Science",
        description:
            "Harness the power of Python for data analysis and visualization.",
    },
    {
        id: 7,
        title: "DevOps Handbook",
        description:
            "Learn how to implement DevOps practices in your organization.",
    },
    {
        id: 8,
        title: "Cybersecurity Fundamentals",
        description:
            "Protect your systems and data with essential cybersecurity knowledge.",
    },
];

const BOOKS_PER_PAGE = 3;

export default function HomePage({ params }: { params: { user_id: string } }) {
    const { user_id } = params;
    const [loading , setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
	const router = useRouter();
    const indexOfLastBook = currentPage * BOOKS_PER_PAGE;
    const indexOfFirstBook = indexOfLastBook - BOOKS_PER_PAGE;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
    const totalPages = Math.ceil(books.length / BOOKS_PER_PAGE);
	const [searchQuery, setSearchQuery] = useState('');
    const token = window.localStorage.getItem('token');
    const handleSearch = (event: any) => {
        event.preventDefault();
        router.push(`/search/${user_id}/${encodeURIComponent(searchQuery)}`);
    };
    if(!token){
        useEffect(()=>{
            setTimeout(()=>{
                router.replace('/login');
            },2000);
        },[]);
        return(
            <div className="min-h-screen flex items-center justify-center align-middle">
                <p className="text-lg font-medium">You are not logged in or your session expired. Please login again.</p>
            </div>          
        )
    }
    return (
        <div className="container mx-auto p-4">
            <header className="flex justify-between items-center mb-8">
                <div className="flex items-center">
                    <svg
                        className="w-8 h-8 mr-2" /* Add your library icon SVG here */
                    />
                    <h1 className="text-2xl font-bold">Public Library</h1>
                </div>
                <Button variant="outline" onClick={handleSignOut}>Sign out</Button>
            </header>

            <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2">
                    <h2 className="text-xl font-semibold mb-4">Search Books</h2>
                    <form className="flex mb-8">
                        <Input placeholder="Enter book name" className="mr-2" onChange={(e) => setSearchQuery(e.target.value)} />
                        <Button onClick={(e) => handleSearch(e)} type="submit">Search</Button>
                    </form>

                    <h2 className="text-xl font-semibold mb-4">My Books</h2>
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        books.map((book) => (
                            <Card key={book.id} className="mb-4">
                                <CardContent className="flex p-4">
                                    <img
                                        src={book?.imageUrl}
                                        alt="Book cover"
                                        className="w-24 h-32 object-cover mr-4 rounded-md"
                                    />
                                    <div>
                                        <h3 className="font-semibold">{book.title}</h3>
                                        <p className="text-sm text-gray-500 mt-2">{book.description}</p>
                                        <Button variant="outline" className="mt-4">Return Book</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}

                    <Pagination
                        className="mt-4"
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4">User Profile</h2>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center mb-4">
                                <Avatar className="w-16 h-16 mr-4">
                                    <AvatarImage
                                        src="https://picsum.photos/seed/user/200"
                                        alt="Mitchell Admin"
                                    />
                                    <AvatarFallback>MA</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-semibold">Mitchell Admin</h3>
                                    <p className="text-sm text-gray-500">Your001234</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p>
                                    <span className="font-semibold">Address:</span> Scretharper St. 120/3 San Francisc
                                </p>
                                <p>
                                    <span className="font-semibold">Phone:</span> +1 555-555-5555
                                </p>
                                <p>
                                    <span className="font-semibold">Email:</span> admin@yourdomain.somewhere.com
                                </p>
                                <p>
                                    <span className="font-semibold">Registration:</span> #12345678900
                                </p>
                            </div>
                            <h4 className="font-semibold mt-4 mb-2">Your contact</h4>
                            <p>Mitchell Admin</p>
                            <p>admin@yourdomain.somewhere.com</p>
                            <p>+1 555-555-5555</p>
                            <p>Librarian</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pagination } from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@/lib/constants";

interface Book {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
}

export default function HomePage({ params }: { params: { user_id: string } }) {
    const { user_id } = params;
    const [currentPage, setCurrentPage] = useState(1);
    const [books, setBooks] = useState<Book[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const BOOKS_PER_PAGE = 3;

    useEffect(() => {
        fetchBooks();
    }, [currentPage]);

    const fetchBooks = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${BASE_URL}/api/books`, {
                params: { page: currentPage, limit: BOOKS_PER_PAGE },
            });
            setBooks(response.data.books);
            setTotalPages(response.data.totalPages);
        } catch (err) {
            setError("Error fetching books.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (event: any) => {
        event.preventDefault();
        router.push(`/search/${user_id}/${encodeURIComponent(searchQuery)}`);
    };

    return (
        <div className="container mx-auto p-4">
            <header className="flex justify-between items-center mb-8">
                <div className="flex items-center">
                    <svg className="w-8 h-8 mr-2">{/* Add your library icon SVG here */}</svg>
                    <h1 className="text-2xl font-bold">Public Library</h1>
                </div>
                <Button variant="outline">Sign out</Button>
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
                                        src={book.imageUrl}
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

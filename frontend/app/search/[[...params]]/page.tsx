'use client'
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";

export default function SearchResults({ params }: { params: string[] }) {
    const user_id = params[0];
    const searchQuery = params[1];
    
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 3; // This should be calculated based on actual results

    // Mock search results
    const results = [
        {
            id: 1,
            title: "Odoo 14 Development Cookbook: Rapidly build, customize, and ...",
            description:
                "With over 200 recipes covering real-world examples, solve your...",
            availability: "Available in 5 days",
        },
        {
            id: 2,
            title: "Odoo 15 Development Cookbook: Rapidly build, customize, and ...",
            description:
                "With over 200 recipes covering real-world examples, build your...",
            availability: "Available in 3 days",
        },
    ];

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Here you would typically fetch new results for the selected page
    };

    return (
        <div className="container mx-auto p-4">
            <header className="flex justify-between items-center mb-8">
                <div className="flex items-center">
                    <svg className="w-8 h-8 mr-2">/* Library icon */</svg>
                    <h1 className="text-2xl font-bold">Public Library</h1>
                </div>
                <div>
                    <Button variant="outline" className="mr-2">
                        Home
                    </Button>
                    <Button variant="outline">Logout</Button>
                </div>
            </header>

            <h2 className="text-xl font-semibold mb-4">Searching Books</h2>
            <div className="flex mb-8">
                <Input
                    // defaultValue={decodeURIComponent(query)}
                    className="mr-2"
                />
                <Button>Search</Button>
            </div>
            {results.map((book) => (
                <Card key={book.id} className="mb-4">
                    <CardContent className="flex p-4">
                        <img
                            src={`https://picsum.photos/seed/${book.id}/200/300`}
                            alt="Book cover"
                            className="w-24 h-32 object-cover mr-4"
                        />
                        <div>
                            <h3 className="font-semibold">{book.title}</h3>
                            <p className="text-sm text-gray-500 mt-2">
                                {book.description}
                            </p>
                            <Button
                                variant="outline"
                                className={`mt-4 ${
                                    book.availability.includes("5")
                                        ? "bg-red-100"
                                        : "bg-green-100"
                                }`}
                            >
                                {book.availability}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}

            <Pagination
                className="mt-8"
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

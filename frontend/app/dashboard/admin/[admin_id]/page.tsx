'use client';
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import axios from 'axios';
import { BASE_URL } from '@/lib/constants';

interface StudentLog {
    username: string;
    bookName: string;
    takenDate: string;
    expiryDate: string;
    returnStatus: string;
    fine: number;
}

const AdminPage: React.FC = () => {
    const [finePerDay, setFinePerDay] = useState<string>('');
    const [newLibrarianName, setNewLibrarianName] = useState<string>('');
    const [newLibrarianEmail, setNewLibrarianEmail] = useState<string>('');
    const [newLibrarianPassword, setNewLibrarianPassword] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [studentLogs, setStudentLogs] = useState<StudentLog[]>([]);
    const [filteredLogs, setFilteredLogs] = useState<StudentLog[]>([]);

    useEffect(() => {
        fetchStudentLogs();
    }, []);

    const fetchStudentLogs = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/api/book/get-books-issued-returned`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setStudentLogs(response.data.logs);
            setFilteredLogs(response.data.logs);
        } catch (error) {
            console.error('Error fetching student logs:', error);
        }
    };

    const handleCreateLibrarian = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `${BASE_URL}
                /api/user/register-new-user`,
                { name: newLibrarianName, email: newLibrarianEmail, password: newLibrarianPassword },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert('Librarian created successfully');
        } catch (error) {
            console.error('Error creating librarian:', error);
        }
    };

    const handleSearch = () => {
        const logs = studentLogs.filter(log => 
            log.username.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredLogs(logs);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-8">Admin Page</h1>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Set Fine Per Day</h2>
                <Input
                    value={finePerDay}
                    onChange={(e) => setFinePerDay(e.target.value)}
                    placeholder="Enter fine per day"
                    className="mr-2"
                />
                <Button onClick={() => console.log(`Fine set to ${finePerDay}`)}>Set Fine</Button>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Create New Librarian</h2>
                <Input
                    value={newLibrarianName}
                    onChange={(e) => setNewLibrarianName(e.target.value)}
                    placeholder="Enter librarian name"
                    className="mr-2 mb-2"
                />
                <Input
                    value={newLibrarianEmail}
                    onChange={(e) => setNewLibrarianEmail(e.target.value)}
                    placeholder="Enter librarian email"
                    className="mr-2 mb-2"
                />
                <Input
                    value={newLibrarianPassword}
                    onChange={(e) => setNewLibrarianPassword(e.target.value)}
                    placeholder="Enter librarian password"
                    type="password"
                    className="mr-2 mb-2"
                />
                <Button onClick={handleCreateLibrarian}>Create Librarian</Button>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Search Student Log</h2>
                <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by student username"
                    className="mr-2"
                />
                <Button onClick={handleSearch}>Search</Button>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">Student Logs</h2>
                {filteredLogs.map((log, index) => (
                    <Card key={index} className="mb-4">
                        <CardContent className="p-4">
                            <p><strong>Username:</strong> {log.username}</p>
                            <p><strong>Book Name:</strong> {log.bookName}</p>
                            <p><strong>Taken Date:</strong> {log.takenDate}</p>
                            <p><strong>Expiry Date:</strong> {log.expiryDate}</p>
                            <p><strong>Return Status:</strong> {log.returnStatus}</p>
                            <p><strong>Fine:</strong> ${log.fine}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default AdminPage;


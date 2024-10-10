"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Container from '../../../components/Container';
import AdminNav from '../../../components/AdminNav';
import AdminFooter from '../../../components/AdminFooter';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function AdminUserEditPage({ params }) {
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        if (!session) {
            router.push("/login");
        } else if (session.user.role !== "admin") {
            router.push("/welcome");
        }
    }, [session, router]);

    const { id } = params;
    const [userOldData, setUserOldData] = useState({});
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const getUserById = async (id) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalusers/${id}`, {
                method: "GET",
                cache: "no-store"
            });
            if (!res.ok) {
                throw new Error("Failed to fetch users.");
            }

            const data = await res.json();
            setUserOldData(data.user);
            
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getUserById(id);
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // ส่งคำขออัปเดตผู้ใช้ที่นี่
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalusers/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newName, email: newEmail, password: newPassword }),
            });
            if (!res.ok) {
                throw new Error("Failed to update user.");
            }
            // Redirect or show success message after update
            router.refresh();
            router.push('/admin/users');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Container>
                <AdminNav session={session} />
                <div className="flex-grow">
                    <div className='container mx-auto shadow-xl my-10 p-10 rounded-xl'>
                        <Link href='/admin/users' className='bg-gray-500 inline-block text-white border py-2 px-3 rounded'>Go back</Link>
                        <hr className='my-3' />
                        <h3 className='text-xl'>Admin Edit User Page</h3>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-xl my-2'
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder={userOldData.name || ''}
                            />
                            <input
                                type="email"
                                className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-xl my-2'
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                placeholder={userOldData.email || ''}
                            />
                            <input
                                type="password"
                                className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-xl my-2'
                                placeholder='Password'
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <button type='submit' className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2'>Update User</button>
                        </form>
                    </div>
                </div>
                <AdminFooter />
            </Container>
        </div>
    );
}

export default AdminUserEditPage;

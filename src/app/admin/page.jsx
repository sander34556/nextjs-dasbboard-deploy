"use client"

import React, { useState, useEffect } from 'react'
import Container from './components/Container'
import AdminNav from './components/AdminNav'
import AdminFooter from './components/AdminFooter'
import SideNav from './components/SideNav'
import Content from './components/Content'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

function AdminPage() {

    const { data: session } = useSession();
    if (!session) redirect("/login");
    if (!session?.user?.role === "admin") redirect("/welcome");

    const [totalUsersData, setTotalUserData] = useState([]);
    const [totalPostsData, setTotalPostsData] = useState([]);

    console.log(totalUsersData);

    const getTotalUsers = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalusers`, {
                cache: "no-cache"
            })
            if (!res.ok) throw new Error("Failed to fetch user");

            const data = await res.json();
            setTotalUserData(data.totalUsers);
        } catch (error) {
            console.log("Error loading users: ", error);
        }
    }

    const getTotalPosts = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalposts`, {
                cache: "no-cache"
            })
            if (!res.ok) throw new Error("Failed to fetch post");

            const data = await res.json();
            setTotalPostsData(data.totalPosts);
        } catch (error) {
            console.log("Error loading posts: ", error);
        }
    }

    useEffect(() => {
        getTotalUsers();
        getTotalPosts();
    }, [])

    return (
        <div>
            <Container>
                <AdminNav session={session} />
                <div className="flex-grow">
                    <div className='container mx-auto'>
                        <div className="flex justify-between mt-10">
                            <SideNav />
                            <Content totalUsersData={totalUsersData} totalPostsData={totalPostsData}/>
                        </div>
                    </div>
                </div>
                <AdminFooter />
            </Container>
        </div>
    )
}

export default AdminPage
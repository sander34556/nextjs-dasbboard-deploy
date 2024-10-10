"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Container from '../../components/Container'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'

function EditPage({ params }) {

    const { data: session } = useSession();
    if (!session) redirect("/login");

    const { id } = params;
    console.log(id);

    const [postData, setPostData] = useState("");

    //new data of psot

    const [newTitle, setNewTitle] = useState("");
    const [newImg, setNewImg] = useState("");
    const [newContent, setNewContent] = useState("");

    const router = useRouter();


    const getPostById = async (id) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts/${id}`, {
                method: "GET",
                cache: "no-store"
            })

            if (!res.ok) {
                throw new Error("Failed to fetch post");
            }

            const data = await res.json();
            console.log("Edit post:", data);
            setPostData(data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPostById(id);
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ newTitle, newImg, newContent })

            })

            if (!res.ok) {
                throw new Error("Failed to update post");
            }
            router.refresh();
            router.push("/welcome");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Container>
                <Navbar />
                <div className="flex-grow">
                    <div className='container mx-auto shadow-xl my-10 p-10 rounded-xl'>
                        <Link href='/welcome' className='bg-gray-500 inline-block text-white border py-2 px-3 rounded'>Go back</Link>
                        <hr className='my-3' />
                        <h3 className='text-xl'>Edit Posts</h3>
                        <form onSubmit={handleSubmit}>
                            <input type="text" className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-xl my-2'
                                placeholder={postData.post?.title} onChange={(e) => setNewTitle(e.target.value)} value={newTitle} />
                            <input type="text" className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-xl my-2'
                                placeholder={postData.post?.img} onChange={(e) => setNewImg(e.target.value)} value={newImg} />
                            <textarea className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-xl my-2' name="" id="" cols="30" rows="10"
                                placeholder={postData.post?.content} onChange={(e) => setNewContent(e.target.value)} value={newContent}>

                            </textarea>
                            <button type='submit' name='create' className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2'>Edit Post</button>
                        </form>
                    </div>
                </div>
                <Footer />
            </Container>
        </div>
    )
}

export default EditPage
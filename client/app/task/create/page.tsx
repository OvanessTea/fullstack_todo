'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const PostTask = () => {
    const router = useRouter();
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const addTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title !== "" && body !== "") {
            const formData = {
                title: title,
                content: body
            }
            const add = await fetch(`@/api/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const content = await add.json();
            if (content.success > 0) {
                router.push('/tasks');
            } 
        }
    }

    return (
        <form className="w-full" onSubmit={addTask}>
            <span className="font-bold text-yellow-500 py-2 block underline text-2xl">Form Add</span>
            <div className='w-full py-2'>
                <label htmlFor="" className='text-sm font-sold py-2 block'>Title</label>
                <input type="text" name="title" className="w-full border-[1px] border-gray-200 p-2 rounded-sm" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}/>
            </div>
            <div className="w-full py-2">
                <label htmlFor="" className="text-sm font-bold py-2 block">Content</label>
                <textarea name='title' className="w-full border-[1px] border-gray-200 p2- rounded-sm" onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)} />
            </div>
            <div className="w-full py-2">
                <button className="w-20 p-2 text-white border-gray-200 border-[1px] rounded-sm bg-green-400">Submit</button>
            </div>
        </form>
    )
}

export default PostTask
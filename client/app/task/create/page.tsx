'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const PostTask = () => {
    const router = useRouter();
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [isDone, setIsDone] = useState<string>('false');

    const addTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title !== "" && description !== "") {
            const formData = {
                title: title,
                description: description,
                is_done: isDone
            }
            const add = await fetch(`${process.env.BASE_URL}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const content = await add.json();
            if (content) {
                router.push('/task');
            } 
        }
    }

    return (
        <form className='w-full p-10' onSubmit={addTask}>
            <div className='flex justify-between items-center'>
                <span className='font-bold text-2xl'>New task</span>
                <div className='flex gap-x-2'>
                    <div className='w-full'>
                        <button 
                            disabled={title.length === 0}
                            className={`${title.length === 0
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-blue-500 hover:bg-blue-600'} text-white px-3 py-1 rounded-md`}
                            type='submit'
                        >
                            Save
                        </button>
                    </div>
                    <Link href="#" onClick={() => router.back()}>
                        <button className='bg-slate-500 hover:bg-slate-600 text-white px-3 py-1 rounded-md'>Back</button>
                    </Link>
                </div>
            </div>
            <div className='w-full py-2'>
                <label htmlFor="" className='text-sm font-bold py-2 block'>Title</label>
                <input type="text" name="title" className='w-full border-[1px] border-gray-200 p-2 rounded-md focus:outline-none' value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
            </div>
            <div className='w-full py-2'>
                <label htmlFor="" className='text-sm font-bold py-2 block'>Description</label>
                <textarea name="body" rows={10} className='w-full border-[1px] border-gray-200 p-2 rounded-md focus:outline-none resize-none' value={description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} />
            </div>
            <div className='w-full py-2'>
                <label htmlFor="" className='text-sm font-bold py-2 block'>Status</label>
                    <select name="status" className='w-full border-[1px] border-gray-200 p-2 rounded-md cursor-pointer' value={isDone} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setIsDone(e.target.value)}>
                    <option value="true">Closed</option>
                    <option value="false">Opened</option>
                </select>
            </div>

        </form>
    )
}

export default PostTask
'use client'
import { fetcher } from '@/app/libs';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';

const TaskEdit = ({ params }: { params: { id: string } }) => {
    const router = useRouter();
    const { data: task, isLoading, error } = useSWR(`${process.env.BASE_URL}/tasks/${params.id}`, fetcher);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [isDone, setIsDone] = useState<string>('false');

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setIsDone(String(task.is_done));
        }
    }, [task, isLoading]);

    const updateTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title !== '' && description !== '') {
            const formData = {
                title: title,
                description: description,
                is_done: isDone
            }
            const res = await fetch(`${process.env.BASE_URL}/tasks/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            const content = await res.json();
            if (content) {
                router.push('/task')
            }
        }
    };
    if (error) return <div>Failed to load</div>;
    if (isLoading) return <div><span>Loading...</span></div>;
    if (!task) return null;

    return (
        <form className='w-full p-10' onSubmit={updateTask}>
            <div className='flex justify-between items-center'>
                <span className='font-bold text-2xl'>{task.title}</span>
                <div className='flex gap-x-2'>
                    <div className='w-full'>
                        <button 
                            disabled={title.length === 0 || (task.title === title && task.description === description && String(task.is_done) === isDone)}
                            className={`${title.length === 0 || (task.title === title && task.description === description && String(task.is_done) === isDone) 
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

export default TaskEdit
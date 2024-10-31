'use client'
import { fetcher } from '@/app/libs';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';

const TaskEdit = ({ params }: { params: { id: string } }) => {
    const router = useRouter();
    const { data: task, isLoading, error } = useSWR(`${process.env.BASE_URL}/tasks/${params.id}`, fetcher);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [isDone, setIsDone] = useState<boolean>(false);

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setIsDone(task.id_done);
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
                    body: JSON.stringify(formData)
                }
            })
            const content = await res.json();
            if (content.success > 0) {
                router.push('/task')
            }
        }
    };

    if (error) return <div>Failed to load</div>;
    if (isLoading) return <div><span>Loading...</span></div>;
    if (!task) return null;

    return (
        <form className='w-full' onSubmit={updateTask}>
            <span className='font-bold text-yellow-500 py-2 block underline text-2xl'>Form Add</span>
            <div className='w-full py-2'>
                <label htmlFor="" className='text-sm font-bold py-2 block'>Title</label>
                <input type="text" name="title" className='w-full border-[1px] border-gray-200 p-2 rounded-e-sm' value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
            </div>
            <div className='w-full py-2'>
                <label htmlFor="" className='text-sm font-bold py-2 block'>Description</label>
                <textarea name="body" className='w-full border-[1px] border-gray-200 p-2 rounded-sm' value={description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} />
            </div>
            <div className='w-full py-2'>
                <button className='w-20 p-2 text-white border-gray-200 border-[1px] rounded-sm bg-green-400'>Submit</button>
            </div>
        </form>
    )
}

export default TaskEdit
'use client'
import { fetcher } from '@/app/libs'
import { DeleteTaskModel } from '@/app/types'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import useSWR from 'swr'

const Detail = () => {
    const params = useParams();
    const { data: task, isLoading, error } = useSWR(`${process.env.BASE_URL}/tasks/${params.id}`, fetcher);
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();
    if (error) return <div>Failed to load</div>;
    if (isLoading) return <div><span>Loading...</span></div>;
    if (!task) return null;
    
    let delete_Task: DeleteTaskModel = async (id: string) => {
        const res = await fetch(`${process.env.BASE_URL}/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const content = await res.json();
        if (content.deletedCount > 0) {
            router.push('/');
        }
    }

    return (
        <div className='w-full p-10'>
            <div className='flex justify-between items-center'>
                <div className='py-3'>
                    <h2 className='text-center font-bold text-3xl'>{task.title}</h2>
                    <p className='text-sm text-gray-500'>{task.is_done ? 'Closed' : 'Opened'}</p>
                </div>
                <Link href={'/'}>
                    <button className='bg-slate-500 hover:bg-slate-600 text-white px-3 py-1 rounded-md'>Back</button>
                </Link>
            </div>
            <div className='w-full max-w-4xl m-auto border-[1px] p-3 mb-3 border-gray-500 rounded-md'>
                <label className='text-sm text-gray-500'>Description</label>
                <p dangerouslySetInnerHTML={{ __html: task.description }}></p>
            </div>
            <div className='flex gap-x-2'>
                <Link
                    href={`/task/edit/${task._id}`}
                    className=' border border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-white px-3 py-1 rounded-md'
                >
                    Change
                </Link>
                <button
                    onClick={() => setShowModal(true)}
                    className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md'
                >
                    Delete
                </button>
            </div>
            <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${showModal ? '' : 'hidden'}`}>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
                    <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">Are you sure you want to delete this task? This action cannot be undone.</p>
                    <div className="flex justify-end gap-x-3">
                        <button 
                            onClick={() => setShowModal(false)}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={() => {
                                delete_Task(task._id!);
                                setShowModal(false);
                            }}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail
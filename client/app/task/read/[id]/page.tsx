'use client'
import { fetcher } from '@/app/libs'
import { DeleteTaskModel, TaskModel } from '@/app/types'
import { faGear, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import useSWR from 'swr'

const Detail = ({ params }: { params: { id: string } }) => {
    const { data: task, isLoading, error } = useSWR(`${process.env.BASE_URL}/tasks/${params.id}`, fetcher);
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
        if (content.success > 0) {
            router.push('/');
        }
    }

    return (
        <div className='w-full'>
            <h2 className='text-center font-bold text-3xl py-3'>{task.title}</h2>
            <div className='w-full max-w-4xl m-auto border-[1px] p-3 border-gray-500 rounded-md'>
                <p dangerouslySetInnerHTML={{ __html: task.description }}></p>
            </div>
            <div className='flex gap-x-2'>
                <Link
                    href={`/task/edit/${task._id}`}
                    className=''
                >
                    <FontAwesomeIcon style={{ fontSize: "16px", color: "#000000", cursor: "pointer" }} icon={faGear}></FontAwesomeIcon>
                </Link>
                <button
                    onClick={() => delete_Task(task._id!)}
                    className=""
                >
                    <FontAwesomeIcon style={{ fontSize: "16px", color: "#ff0000", cursor: "pointer" }} icon={faTrash}></FontAwesomeIcon>
                </button>
            </div>
        </div>
    )
}

export default Detail
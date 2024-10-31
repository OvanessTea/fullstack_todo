import { fetcher } from '@/app/libs'
import React from 'react'
import useSWR from 'swr'

const Detail = ({ params }: { params: { id: string } }) => {
    const { data: task, isLoading, error } = useSWR(`${process.env.BASE_URL}/tasks/${params.id}`, fetcher)

    if (error) return <div>Failed to load</div>;
    if (isLoading) return <div><span>Loading...</span></div>;
    if (!task) return null;

    return (
        <div className='w-full'>
            <h2 className='text-center font-bold text-3xl py-3'>{task.result.title}</h2>
            <div className='w-full max-w-4xl m-auto border-[1px] p-3 border-gray-500 rounded-md'>
                <p dangerouslySetInnerHTML={{ __html: task.result.content }}></p>
            </div>
        </div>
    )
}

export default Detail
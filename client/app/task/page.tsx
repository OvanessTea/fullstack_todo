'use client';
import React, { useEffect, useState } from 'react'
import { TaskModel, AddTaskModel, DeleteTaskModel, PatchTaskModel } from '../types';
import useSWR from 'swr';
import { fetcher } from '../libs';
import Link from 'next/link';
import Task from '../components/Task';

const Tasks = () => {
    const [tasks, setTasks] = useState<TaskModel[]>([]);

    const { data, error, isLoading } = useSWR<any>(`${process.env.BASE_URL}/tasks`, fetcher);
    console.log(data)
    useEffect(() => {
        if (data && data.length) {
            setTasks(data);
        }
    }, [data, isLoading])

    if (error) return <div>Failed to load</div>;
    if (isLoading) return <div><span>Loading...</span></div>;
    if (!data) return null;
    let delete_Task: DeleteTaskModel = async (id: string) => {
        const res = await fetch(`${process.env.BASE_URL}/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const content = await res.json();
        if (content.success > 0) {
            setTasks(tasks?.filter((task: TaskModel) => { return task._id !== id }));
        }
    }

    return (
        <div className="w-full max-w-7xl m-auto">
            <div className='flex gap-2 mb-3'>
                {
                    tasks && tasks.map((item: TaskModel) => <Task key={item._id} item={item} deleteTask={delete_Task} />)
                }
            </div>
            <Link href={`/task/create`} className="rounded-lg bg-green-500 p-2 inline-block text-white">Create</Link>
        </div>
    )
}

export default Tasks
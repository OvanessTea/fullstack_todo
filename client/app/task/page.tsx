'use client';
import React, { useEffect, useState } from 'react'
import { TaskModel, AddTaskModel, DeleteTaskModel, PatchTaskModel } from '../types';
import useSWR from 'swr';
import { fetcher } from '../libs';
import Link from 'next/link';
import Task from '../components/Task';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';

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
    const date = new Date();
    const pathname = usePathname();
    console.log(pathname)
    return (
        <div className="w-full max-w-7xl m-auto p-10">
            <div className="flex items-center gap-x-6 mb-4">
                <div>
                    <h1>Yours tasks</h1>
                    <h2>
                        {date.toLocaleString('en-us', { weekday: 'long' })}, &nbsp;
                        {date.getDate()}&nbsp;
                        {date.toLocaleString('en-us', { month: 'long' })}
                    </h2>
                </div>
                <Link href={`/task/create`} className="rounded-xl bg-blue-200 p-2 inline-block text-white"><span>+</span> New Task</Link>
            </div>
            <div>
                <button className={classNames(pathname === '/' ? 'text-blue-400' : 'text-gray-400', 'text-lg hover:text-blue-500 active:text-blue-800')}>All</button>
                <button className={classNames(pathname === '/opened' ? 'text-blue-400' : 'text-gray-400', 'text-lg hover:text-blue-500 active:text-blue-800')}>Opened</button>
                <button className={classNames(pathname === '/closed' ? 'text-blue-400' : 'text-gray-400', 'text-lg hover:text-blue-500 active:text-blue-800')}>Closed</button>
            </div>
            <div className='flex gap-2 mb-3'>
                {
                    tasks && tasks.map((item: TaskModel) => <Task key={item._id} item={item} deleteTask={delete_Task} />)
                }
            </div>
        </div>
    )
}

export default Tasks
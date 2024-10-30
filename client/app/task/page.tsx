'use client';
import React, { useEffect, useState } from 'react'
import { TaskModel, AddTaskModel, DeleteTaskModel, PatchTaskModel } from '../types';
import useSWR from 'swr';
import { fetcher } from '../libs';
import Link from 'next/link';
import Task from '../components/Task';

const Tasks = () => {
    const [tasks, setTasks] = useState<TaskModel[]>([]);

    const { data, error, isLoading } = useSWR<any>(`@/api/tasks`, fetcher);

    useEffect(() => {
        if(data && data.result.data) {
            setTasks(data.result.data);
        }
    }, [data, isLoading])

    if (error) return <div>Failed to load</div>;
    if (isLoading) return <div>Loading...</div>;
    if(!data) return null;
    let delete_Task: DeleteTaskModel = async(id: string) => {
        const res = await fetch(`@/api/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const content = await res.json();
        if (content.success > 0) {
            setTasks(tasks?.filter((task: TaskModel ) => { return task._id !== id }));
        }
    }

    return (
        <div className="w-full max-w-7xl m-auto">
            <table className="w-full border-collapse border border-slate-400">
                <caption className="caption-top py-5 font-bold text-green-500 text-2xl">
                    List Tasks - Counter :
                    <span className="text-red-500 font-bold">{tasks?.length}</span>
                </caption>

                <thead>
                    <tr className='text-center'>
                        <th className="border border-slate-300">Title</th>
                        <th className="border border-slate-300">Description</th>
                        <th className="border border-slate-300">Is Done?</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={5}>
                            <Link href={`/task/create`} className="bg-green-500 p-2 inline-block text-white">Create</Link>
                        </td>
                        {
                            tasks && tasks.map((item: TaskModel)=> <Task key={item._id} item={item} deleteTask={delete_Task}/>)
                        }
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Tasks
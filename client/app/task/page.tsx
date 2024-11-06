'use client';
import React, { useEffect, useState } from 'react'
import { TaskModel } from '../types';
import useSWR from 'swr';
import { fetcher } from '../libs';
import Link from 'next/link';
import Task from '../components/Task';
import classNames from 'classnames';

const Tasks = () => {
    const [tasks, setTasks] = useState<TaskModel[]>([]);
    const { data, error, isLoading } = useSWR<any>(`${process.env.BASE_URL}/tasks`, fetcher);
    const [selectedTab, setSelectedTab] = useState<string>('All');

    useEffect(() => {
        if (data && data.length) {
            setTasks(data);
        }
    }, [data, isLoading])

    
    const [taskCounts, setTaskCounts] = useState<{ all: number, opened: number, closed: number }>({ all: 0, opened: 0, closed: 0 });
    useEffect(() => {
        if (data) {
            const taskCounts = data.reduce((acc: { all: number, opened: number, closed: number }, task: TaskModel) => {
                acc.all++;
                if (task.is_done) {
                    acc.closed++;
                } else {
                    acc.opened++;
                }
                return acc;
            }, { all: 0, opened: 0, closed: 0 });
            setTaskCounts(taskCounts);
        }
    }, [data]);

    if (error) return <div>Failed to load</div>;
    if (isLoading) return <div><span>Loading...</span></div>;
    if (!data) return null;

    useEffect(() => {
        let filteredTasks = [...data];
        if (selectedTab === 'Closed') {
            filteredTasks = data.filter((task: TaskModel) => task.is_done);
        } else if (selectedTab === 'Opened') {
            filteredTasks = data.filter((task: TaskModel) => !task.is_done);
        }
        setTasks(filteredTasks);
    }, [selectedTab]);

    const date = new Date();
    return (
        <div className="w-full max-w-7xl m-auto p-10">
            <div className="flex items-center gap-x-6 mb-4">
                <div className='flex flex-col gap-y-1'>
                    <h1 className='text-2xl font-bold'>Yours tasks</h1>
                    <h2 className='text-sm'>
                        {date.toLocaleString('en-us', { weekday: 'long' })}, &nbsp;
                        {date.getDate()}&nbsp;
                        {date.toLocaleString('en-us', { month: 'long' })}
                    </h2>
                </div>
                <Link href={`/task/create`} className="rounded-xl bg-blue-200 p-2 inline-block text-white"><span>+</span> New Task</Link>
            </div>
            <div className='flex gap-x-2 mb-2'>
                <button
                    className={classNames(selectedTab === 'All' ? 'text-blue-400' : 'text-gray-400', 'text-lg hover:text-blue-500 active:text-blue-800 flex items-center gap-x-1')}
                    onClick={() => setSelectedTab('All')}>
                    All 
                    <span className='text-sm bg-blue-500 rounded-lg px-1 text-white min-w-[20px] text-center'>
                        {taskCounts.all}
                    </span>
                </button>
                <button
                    className={classNames(selectedTab === 'Opened' ? 'text-blue-400' : 'text-gray-400', 'text-lg hover:text-blue-500 active:text-blue-800 flex items-center gap-x-1')}
                    onClick={() => setSelectedTab('Opened')}>
                    Opened 
                    <span className='text-sm bg-blue-500 rounded-lg px-1 text-white min-w-[20px] text-center'>
                        {taskCounts.opened}
                    </span>
                </button>
                <button
                    className={classNames(selectedTab === 'Closed' ? 'text-blue-400' : 'text-gray-400', 'text-lg hover:text-blue-500 active:text-blue-800 flex items-center gap-x-1')}
                    onClick={() => setSelectedTab('Closed')}>
                    Closed
                    <span className='text-sm bg-blue-500 rounded-lg px-1 text-white min-w-[20px] text-center'>
                        {taskCounts.closed}
                    </span>
                </button>
            </div>
            <div className='flex flex-wrap gap-2 mb-3 max-h-[650px] overflow-y-auto'>
                {
                    tasks && tasks.map((item: TaskModel) => <Task key={item._id} item={item} />)
                }
            </div>
        </div>
    )
}

export default Tasks
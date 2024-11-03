import React from 'react';
import { DeleteTaskModel, TaskModel } from '../types';
import Link from 'next/link';

interface IProp {
  item: TaskModel;
  deleteTask: DeleteTaskModel
}

const Task: React.FC<IProp> = (props: IProp) => {
  return (
    <div className='border border-slate-500 rounded-lg w-60 p-2 relative'>
      <Link 
        href={`/task/edit/${props.item._id}`} 
        className='text-blue-300 cursor-pointer hover:text-blue-400'
      >
        {props.item.title}
      </Link>
      <hr className='my-2' />
      <p>{props.item.description}</p>
      <div className='w-full fixed bottom-2'>
        <button 
          onClick={() => props.deleteTask(props.item._id!)} 
          className="bg-red-500 p-2 inline-block text-white text-sm"
        >
          Delete
        </button>
        <Link 
          href={`/task/edit/${props.item._id}`} 
          className='bg-yellow-500 p-2 inline-block ml-3 text-white text-sm'
        >
          Edit
        </Link>
      </div>
    </div>
  )
}

export default Task
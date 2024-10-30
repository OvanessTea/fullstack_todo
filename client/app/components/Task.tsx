import React from 'react';
import { DeleteTaskModel, TaskModel } from '../types';
import Link from 'next/link';

interface IProp {
  item: TaskModel;
  deleteTask: DeleteTaskModel
}

const Task: React.FC<IProp> = (props: IProp) => {
  return (
    <tr>
      <td className="border border-slate-300">{props.item.title}</td>
      <td className="border border-slate-300">{props.item.description}</td>
      <td className="border border-slate-300 text-center">{props.item.is_done ? "True" : "False"}</td>
      <td className="w-52 border border-slate-300">
        <span onClick={()=>props.deleteTask(props.item._id!)} className="bg-red-500 p-2 inline-block text-white text-sm">Delete</span>
        <Link href={`/task/edit/${props.item._id}`} className='bg-yellow-500 p-2 inline-block ml-3 text-white  text-sm'>Edit</Link>
        <Link href={`/task/edit/${props.item._id}`} className='bg-yellow-500 p-2 inline-block ml-3 text-white  text-sm'>View</Link>
      </td>
    </tr>
  )
}

export default Task
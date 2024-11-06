import React from 'react';
import { DeleteTaskModel, TaskModel } from '../types';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faTrash, faGear } from "@fortawesome/free-solid-svg-icons";
import classNames from 'classnames';
import styles from './Task.module.scss';

interface IProp {
  item: TaskModel;
  deleteTask: DeleteTaskModel
}

const Task: React.FC<IProp> = (props: IProp) => {
  return (
    <div className={classNames('border border-slate-500 rounded-lg   p-2 pb-12 relative', styles.task_size)}>
      <div className='flex justify-between items-center'>
        <Link
          href={`/task/edit/${props.item._id}`}
          className='text-blue-300 cursor-pointer hover:text-blue-400'
        >
          {props.item.title}
        </Link>
        <div className='flex gap-x-2'>
          <Link
            href={`/task/edit/${props.item._id}`}
            className=''
          >
            <FontAwesomeIcon style={{ fontSize: "16px", color: "#000000", cursor: "pointer" }} icon={faGear}></FontAwesomeIcon>
          </Link>
          <button
            onClick={() => props.deleteTask(props.item._id!)}
            className=""
          >
            <FontAwesomeIcon style={{ fontSize: "16px", color: "#ff0000", cursor: "pointer" }} icon={faTrash}></FontAwesomeIcon>
          </button>
        </div>
      </div>
      <hr className='my-2' />
      <p className='text-sm'>{props.item.description}</p>
      <div className='w-full absolute bottom-2'>
      </div>
    </div>
  )
}

export default Task
import React from 'react';
import { TaskModel } from '../types';
import Link from 'next/link';
import classNames from 'classnames';
import styles from './Task.module.scss';

interface IProp {
  item: TaskModel;
}

const Task: React.FC<IProp> = (props: IProp) => {
  return (
    <div className={classNames('border border-slate-500 rounded-lg   p-2 pb-12 relative', styles.task_size)}>
      <div className='flex justify-between items-center'>
        <Link
          href={`/task/read/${props.item._id}`}
          className={classNames(props.item.is_done && styles.complited, 'text-xl font-bold cursor-pointer hover:text-gray-400')}
        >
          {props.item.title}
        </Link>
      </div>
      <hr className='my-2' />
      <p className='text-sm'>{props.item.description}</p>
      <div className='w-full absolute bottom-2'>
      </div>
    </div>
  )
}

export default Task
import React from 'react'
import styles from './Loading.module.scss';

const Loading = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <svg className={styles.spinner} width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                <circle className={styles.path} fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
            </svg>
        </div>
    )
}

export default Loading
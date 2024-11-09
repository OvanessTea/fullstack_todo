import React from 'react'

const Error = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-2">Error</h2>
        <p className="text-gray-600">Something went wrong. Please try again later.</p>
      </div>
    </div>
  )
}

export default Error
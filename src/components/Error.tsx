import React from 'react'

interface ErrorProps {
  message: string
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className="text-center text-red-500 dark:text-red-400">
      <p className="text-xl">{message}</p>
      <p className="mt-2">Please try again later.</p>
    </div>
  )
}

export default Error
import React from 'react'

const EmptyPlaceholder = ({
  width = 72,
  height = 72,
  className = '',
  strokeWidth = 0,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      strokeWidth={strokeWidth}
    >
      {/* This space is intentionally left blank */}
    </svg>
  )
}

export default EmptyPlaceholder

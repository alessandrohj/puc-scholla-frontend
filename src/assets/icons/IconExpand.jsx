import React from 'react'

export default function IconExpand({ height = 50, width = 50, color = 'blue' }) {
    return (
        <span>
        <svg width={width} height={height} viewBox="0 0 40 40" fill={color} xmlns="http://www.w3.org/2000/svg">
        <path d="M26.7708 15.4875L20.3042 21.9542L13.8375 15.4875C13.1875 14.8375 12.1375 14.8375 11.4875 15.4875C10.8375 16.1375 10.8375 17.1875 11.4875 17.8375L19.1375 25.4875C19.7875 26.1375 20.8375 26.1375 21.4875 25.4875L29.1375 17.8375C29.7875 17.1875 29.7875 16.1375 29.1375 15.4875C28.4875 14.8542 27.4208 14.8375 26.7708 15.4875Z" fill="#3796F1"/>
        </svg>
        </span>
    )
}

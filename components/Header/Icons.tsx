export function Cart({className = ""}: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"
             className={className}>
            <path fill="currentColor" fillRule="evenodd"
                  d="M.5 4A1.5 1.5 0 012 2.5h3c.74 0 1.37.54 1.483 1.272L6.67 5h15.082a1 1 0 01.977 1.217l-1.556 7a1 1 0 01-.976.783H8.056l.23 1.5H19a1.5 1.5 0 010 3H7a1.5 1.5 0 01-1.483-1.272L3.713 5.5H2A1.5 1.5 0 01.5 4ZM9 23a2 2 0 100-4 2 2 0 000 4Zm9 0a2 2 0 100-4 2 2 0 000 4Z"
                  clipRule="evenodd"/>
        </svg>
    )
}

export function User({className = ""}: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={className}>
            <path d="M10 9a6 6 0 1 1 6 6 6 6 0 0 1-6-6Zm16 20H6a3 3 0 0 1-3-3 9 9 0 0 1 9-9h8a9 9 0 0 1 9 9 3 3 0 0 1-3 3Z"/>
        </svg>
    )
}

export function Search({className = ""}: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" className={className}>
            <path fill="currentColor" fillRule="evenodd" d="M10.5 2a8.5 8.5 0 104.856 15.477l4.083 4.084a1.5 1.5 0 102.122-2.122l-4.084-4.083A8.5 8.5 0 0010.5 2ZM5 10.5a5.5 5.5 0 1111 0 5.5 5.5 0 01-11 0Z" clipRule="evenodd"/>
        </svg>
    )
}
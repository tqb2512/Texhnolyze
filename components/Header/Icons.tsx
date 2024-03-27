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

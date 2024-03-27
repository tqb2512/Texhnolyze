export function Category({className = ""}: { className?: string }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
            preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
            <path fill="currentColor"
                  d="M2 19.5A1.5 1.5 0 013.5 18h6a1.5 1.5 0 010 3h-6A1.5 1.5 0 012 19.5ZM2 12a1.5 1.5 0 011.5-1.5h11a1.5 1.5 0 010 3h-11A1.5 1.5 0 012 12Zm0-7.5A1.5 1.5 0 013.5 3h17a1.5 1.5 0 010 3h-17A1.5 1.5 0 012 4.5Z"
                  opacity=".99"/>
        </svg>
    )
}

export function Prev({className = ""}: { className?: string }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
            preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
            <path fill="currentColor" fillRule="evenodd"
                  d="M16.278 4.24a1.5 1.5 0 010 2.12l-5.657 5.657 5.657 5.657a1.5 1.5 0 11-2.121 2.122l-6.718-6.718a1.5 1.5 0 010-2.121l6.718-6.718a1.5 1.5 0 012.121 0Z"
                  clipRule="evenodd"/>
        </svg>
    )
}

export function Next({className = ""}: { className?: string }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
            preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
            <path fill="currentColor" fillRule="evenodd"
                  d="M7.44 19.796a1.5 1.5 0 010-2.122l5.656-5.656L7.44 6.36a1.5 1.5 0 112.122-2.122l6.717 6.718a1.5 1.5 0 010 2.121l-6.717 6.718a1.5 1.5 0 01-2.122 0Z"
                  clipRule="evenodd"/>
        </svg>
    )
}

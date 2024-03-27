export default function CategoryBox() {
    return (
        <div className="h-[160px] min-w-[80px] rounded-lg hover:bg-blue-light-bg p-2">
            <div className="h-2/3 bg-green-500">
            </div>
            <div className="h-1/3 flex flex-col justify-center items-center">
                <h2 className="text-lg font-semibold">Category</h2>
                <h2 className="text-sm">Category</h2>
            </div>
        </div>
    )
}
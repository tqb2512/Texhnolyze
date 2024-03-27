interface ItemBoxProps {
    showDetail?: boolean;
}
export default function ItemBox({showDetail = false}: ItemBoxProps) {
    return (
        <div className="min-h-[200px] min-w-[180px] rounded-md bg-white p-3">
            <div className="min-h-[180px] bg-green-500">
            </div>

            <div>
                <h2 className="text-lg font-semibold">Product name</h2>
                <h2 className="text-lg font-semibold">Price</h2>
            </div>

            {showDetail && (
                <div>
                    <hr className="mt-2 mb-2"/>
                    <div>
                        <h2>Detail</h2>
                    </div>
                </div>
            )}
        </div>
    )
}
export function Pagination() {
  return (
    <div className="flex items-center justify-between mt-6">
      <div className="text-sm text-gray-500">10 of 456 items</div>

      <div className="flex items-center space-x-1">
        <button className="h-8 w-8 flex items-center justify-center rounded-full bg-yellow-500 text-white">1</button>
        <button className="h-8 w-8 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100">
          2
        </button>
        <button className="h-8 w-8 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100">
          3
        </button>
        <button className="h-8 w-8 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100">
          4
        </button>
        <button className="h-8 w-8 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100">
          5
        </button>
        <span className="text-gray-500">...</span>
        <button className="h-8 w-8 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100">
          10
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">Show</span>
        <select className="border rounded p-1 text-sm">
          <option>10 rows</option>
          <option>20 rows</option>
          <option>50 rows</option>
        </select>
      </div>
    </div>
  )
}

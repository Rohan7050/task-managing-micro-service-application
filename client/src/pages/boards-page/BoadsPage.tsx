function BoadsPage() {
  const boardList = [
    {
        "user": "c6cc2b69-e474-4ce4-8b9f-b89d02dc8b79",
        "name": "first board",
        "desc": "",
        "createdAt": "2025-10-26T08:43:34.401Z",
        "updatedAt": "2025-10-26T08:43:34.401Z",
        "id": "68fddf36bdf19932d78b8de5",
        "accessType": "admin"
    }
  ]
  return (
    <div className="isolate px-6 py-24 sm:py-32 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-[#6A1E55] to-[#3B1C32] shadow-lg rounded-md border-2 border-white shadow-indigo-500/50 p-4 flex flex-col justify-start items-start">
          <h1 className="text-white">first board</h1>
          <p className="pt-4 text-white">
            first board first board first board first board
          </p>
        </div>
        <div className="bg-gradient-to-br from-[#007074] to-[#034C53] shadow-lg rounded-md border-2 border-white shadow-indigo-500/50 p-4 flex flex-col justify-start items-start">
          <h1 className="text-white">second board</h1>
          <p className="pt-4 text-white">
            second board second board second board second board
          </p>
        </div>
        <div className="bg-gradient-to-br from-[#427D9D] to-[#164863] shadow-lg rounded-md border-2 border-white shadow-indigo-500/50 p-4 flex flex-col justify-start items-start">
          <h1 className="text-white">third board</h1>
          <p className="pt-4 text-white">
            third board third board third board third board
          </p>
        </div>
        <div className="bg-gradient-to-br from-[#A7D129] to-[#616F39] shadow-lg rounded-md border-2 border-white shadow-indigo-500/50 p-4 flex flex-col justify-start items-start">
          <h1 className="text-white">four board</h1>
          <p className="pt-4 text-white">
            four board four board four board four board
          </p>
        </div>
      </div>
    </div>
  )
}



export default BoadsPage
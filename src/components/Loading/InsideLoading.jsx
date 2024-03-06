export default function InsideLoading() {
  return (
    <>
      <div className="top-0 left-0 absolute h-full w-full bg-transparent z-50 flex justify-center items-center">
        <div className="border-4 w-6 h-6 rounded-full border-t-sky-500 animate-spin"></div>
      </div>
    </>
  )
}

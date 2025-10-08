export default function Loading() {
  return (
    <div className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#00000080] flex justify-center items-center">
      <div className="animate-spin size-[200px] border-[30px] border-blue-500 border-t-[#00000000] rounded-full"></div>
    </div>
  );
}

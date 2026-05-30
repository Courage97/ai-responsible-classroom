export default function CornerBrackets() {
  return (
    <>
      <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#378ADD]" />
      <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#378ADD]" />
      <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#378ADD]" />
      <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#378ADD]" />
    </>
  );
}
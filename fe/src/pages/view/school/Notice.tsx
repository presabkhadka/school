import SchoolNavbar from "@/components/SchoolNavbar";

export default function Notice() {
  let [notice, setNotice]
  return (
    <div className="h-screen w-screen grid grid-cols-1 md:grid-cols-12 gap-4 overflow-hidden">
      <div className="col-span-full">
        <div className="top-0 sticky z-50">
          <SchoolNavbar />
        </div>
        <div className="p-6">hi there</div>
      </div>
    </div>
  );
}

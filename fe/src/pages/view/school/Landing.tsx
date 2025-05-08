import SchoolNavbar from "@/components/SchoolNavbar";

export default function Landing() {
  return (
    <div className="grid grid-cols-1 h-screen md:grid md:grid-cols-12 bg-muted/80">
      <div className="col-span-full">
        <div className="top-0 sticky z-50 bg-white shadow-lg overflow-hidden dark:bg-muted/80">
          <SchoolNavbar />
        </div>
        <div className="p-6 grid grid-">
            
        </div>
      </div>
    </div>
  );
}

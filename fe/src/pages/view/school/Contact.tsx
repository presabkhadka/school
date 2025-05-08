import SchoolNavbar from "@/components/SchoolNavbar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <div className="h-screen w-screen grid grid-cols-1 md:grid md:grid-cols-12 overflow-x-hidden">
      <div className="col-span-full flex flex-col">
        <div className="top-0 sticky z-50 bg-white overflow-hidden dark:bg-black shadow-lg">
          <SchoolNavbar />
        </div>
        <div className="grid grid-cols-1 md:grid md:grid-cols-2 gap-4 flex-1">
          <div className="col-span-1 flex items-center justify-center w-full">
            <form action="#">
              <div className="grid grid-cols-2 p-6 gap-4">
                <div className="col-span-1">
                  <label htmlFor="firstName">First Name</label>
                  <Input placeholder="Enter your first name" type="text" className="p-6"/>
                </div>
                <div className="col-span-1">
                  <label htmlFor="lastName">Last Name</label>
                  <Input placeholder="Enter your last name" type="text" className="p-6"/>
                </div>
                <div className="col-span-full">
                  <label htmlFor="lastName">Email</label>
                  <Input placeholder="Enter your email" type="email" className="p-6"/>
                </div>
                <div className="col-span-1">
                  <label htmlFor="lastName">Address</label>
                  <Input placeholder="Enter your address" type="text" className="p-6"/>
                </div>
                <div className="col-span-1">
                  <label htmlFor="lastName">Phone No</label>
                  <Input placeholder="Enter your phone number" type="text" className="p-6"/>
                </div>
                <div className="col-span-full">
                  <label htmlFor="lastName">Message</label>
                  <Textarea placeholder="Enter your message" className="p-6"/>
                </div>
                <div className="flex justify-center w-full col-span-full">
                  <button className="border px-4 py-2 rounded-lg w-full bg-gradient-to-r from-blue-300 to-green-300 text-white cursor-pointer hover:scale-105">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="hidden md:flex md:flex-col md:col-span-1 h-full bg-gradient-to-r from-blue-300 to-green-300 justify-center items-center gap-4">
            <h1 className="text-6xl text-white font-bold">Get in Touch</h1>
            <p className="text-lg w-2/3 text-justify text-white font-semibold">
              We’d love to hear from you! Whether you have questions about our
              programs, want to schedule a visit, or need support, our team is
              here to help.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

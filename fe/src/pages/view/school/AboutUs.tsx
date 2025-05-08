import SchoolNavbar from "@/components/SchoolNavbar";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Footer from "@/components/footer";

export default function AboutUs() {
  interface Staff {
    _id: string;
    userName: string;
    userEmail: string;
    userDesignation: string;
    userExperience: string;
    staffImage: string;
  }

  let [staff, setStaff] = useState<Staff[]>([]);

  useEffect(() => {
    let fetchStaffs = async () => {
      try {
        let response = await axios.get("http://localhost:4646/staffs");
        setStaff(response.data.staffs);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    };
    fetchStaffs();
  }, []);

  return (
    <div className="h-screen w-screen grid grid-cols-1 md:grid md:grid-cols-12 gap-4 dark:bg-muted overflow-x-hidden">
      <div className="col-span-full">
        <div className="top-0 sticky z-50 bg-white shadow-lg dark:bg-muted">
          <SchoolNavbar />
        </div>
        <div className="px-6 py-10 flex justify-center gap-8">
          <div className="h-96 w-[30%]">
            <img
              src="principal.jpeg"
              alt="princpal"
              className="h-96 w-full rounded-lg"
            />
          </div>
          <div className="flex flex-col w-1/3 gap-4">
            <p className="text-2xl font-bold underline">A message from the principal</p>
            <p className="text-lg text-justify">
              Welcome to our official school website. As Principal, I am proud
              to lead an institution dedicated to academic excellence, character
              development, and lifelong learning. We believe that education is
              not just about lessons and books — it’s about nurturing minds,
              building values, and shaping the future of our students. Our team
              of passionate educators is committed to providing a safe,
              inclusive, and inspiring environment where every child can thrive.
              We emphasize collaboration, integrity, and innovation in
              everything we do, ensuring that each student receives a
              well-rounded education. <br /> Thank you for your trust and
              support. Together, let’s empower our students to become
              responsible, confident, and compassionate citizens of tomorrow.
            </p>
          </div>
        </div>
        <div className="flex justify-center px-8 py-10 gap-4 bg-muted dark:border">
          <div className="grid grid-cols-1 md:grid md:grid-cols-3 gap-4">
            <div className="border-2 p-4 rounded-lg bg-white shadow-lg dark:bg-muted hover:border-blue-500">
              <h2 className="font-bold text-3xl">Our Mission</h2>
              <p className="text-lg text-justify">
                To provide high-quality, inclusive education that fosters
                academic excellence, personal growth, and lifelong
                learning—ensuring student well-being, integrity, and success in
                a safe and supportive environment.
              </p>
            </div>
            <div className="border-2 p-4 rounded-lg bg-white shadow-lg dark:bg-muted hover:border-green-500">
              <h2 className="font-bold text-3xl">Our Vision</h2>
              <p className="text-lg text-justify">
                To be a trusted leader in education, nurturing innovative,
                responsible, and compassionate learners who positively
                contribute to their communities and the world.
              </p>
            </div>
            <div className="border-2 p-4 rounded-lg bg-white shadow-lg dark:bg-muted hover:border-yellow-500">
              <h2 className="font-bold text-3xl">Our Values</h2>
              <p className="text-lg text-justify">
                Excellence, integrity, collaboration, inclusivity, and
                innovation guide our commitment to providing quality education,
                nurturing strong character, and fostering lifelong learning in
                every student.
              </p>
            </div>
          </div>
        </div>
        <div className="px-8 py-10 gap-4 flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-blue-500">Our Staff</h1>
          <div className="grid grid-cols-1 md:grid md:grid-cols-3 gap-4">
            {staff.map((stf, index) => (
              <div
                className="border-2 col-span-1 rounded-lg hover:border-blue-500"
                key={index}
              >
                <img
                  src={`http://localhost:4646${stf.staffImage}`}
                  alt="teacher image"
                  className="rounded-t-lg object-center aspect-video"
                />
                <div className="p-4 flex flex-col gap-2">
                  <p className="text-xl font-bold">Name: {stf.userName}</p>
                  <p className="text-xl font-semibold">
                    Email: {stf.userEmail}
                  </p>
                  <p className="text-xl font-semibold">
                    Designtaion: {stf.userDesignation}
                  </p>
                  <p className="font-semibold text-xl">
                    Experience: {stf.userExperience} years
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      <Footer/>
      </div>
    </div>
  );
}

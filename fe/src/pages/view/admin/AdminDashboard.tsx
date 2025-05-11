import AdminNavbar from "@/components/AdminNavbar";
import axios from "axios";
import { AlertTriangle, User } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  let [totalStaff, setTotalStaff] = useState(0);
  let [totalNotice, setTotalNotice] = useState(0);

  useEffect(() => {
    let fetchStaff = async () => {
      try {
        let token = localStorage.getItem("Authorization")?.split(" ")[1];
        if (!token) {
          throw new Error("No token found in headers");
        }
        let response = await axios.get(
          "http://localhost:4646/admin/total-staff",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTotalStaff(response.data.totalStaff);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    };
    fetchStaff();
    let interval = setInterval(fetchStaff, 10000);
    return () => clearInterval(interval);
  }, [totalStaff]);

  useEffect(() => {
    let fetchNotice = async () => {
      try {
        let token = localStorage.getItem("Authorization")?.split(" ")[1];
        if (!token) {
          throw new Error("No token found in headers");
        }
        let response = await axios.get(
          "http://localhost:4646/admin/total-notice",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTotalNotice(response.data.totalNotice);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    };
    fetchNotice();
    let interval = setInterval(fetchNotice, 10000);
    return () => clearInterval(interval);
  }, [totalNotice]);

  return (
    <div className="grid grid-cols-1 h-screen md:grid-cols-12 dark:bg-muted">
      <div className="col-span-full">
        <div className="top-0 sticky z-50">
          <AdminNavbar />
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full flex flex-col gap-2 py-2 px-4 items-center border-2 rounded-lg hover:border-green-500">
            <h1 className="font-bold text-xl sm:text-2xl md:text-2xl text-gray-800 dark:text-gray-200 self-start">
              Total Staff
            </h1>
            <div className="w-full flex justify-between items-center text-green-500">
              <h1 className="font-semibold text-2xl sm:text-2xl md:text-3xl">
                {totalStaff}
              </h1>
              <User />
            </div>
          </div>
          <div className="w-full flex flex-col gap-2 py-2 px-4 items-center border-2 rounded-lg hover:border-purple-500">
            <h1 className="font-bold text-xl sm:text-2xl md:text-2xl text-gray-800 dark:text-gray-200 self-start">
              Total Notice
            </h1>
            <div className="w-full flex justify-between items-center text-purple-500">
              <h1 className="font-semibold text-2xl sm:text-2xl md:text-3xl">
                {totalNotice}
              </h1>
              <AlertTriangle />
            </div>
          </div>
          <div className="col-span-full">
            <iframe
              id="cb_nciframe"
              src="https://www.ashesh.com.np/nepali-calendar/widget/calendar-badge.php?api=58220210713382"
              className="w-full h-64"
            ></iframe>
          </div>
          <div className="col-span-full">
            <iframe
              id="ev_nciframe"
              src="https://www.ashesh.com.np/calendar-event/event.html"
              className="w-full h-96"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

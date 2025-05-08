import { NavLink, useNavigate } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { LogIn } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function SchoolNavbar() {
  const navigate = useNavigate();
  return (
    <div className="p-6 w-screen flex items-center justify-between">
      <h1 className="text-lg font-bold md:text-2xl">
        Shree Balmandir Secondary School
      </h1>
      <div className="flex gap-2 items-center">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            `flex p-2 items-center gap-4 hover:outline-none cursor-pointer ${
              isActive
                ? "text-green-500 text-xl font-semibold hover:text-green-300"
                : "text-gray-600 font-semibold text-xl hover:text-black hover:dark:text-slate-50"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to={"/about"}
          className={({ isActive }) =>
            `flex p-2 items-center gap-4 hover:outline-none cursor-pointer ${
              isActive
                ? "text-green-500 text-xl font-semibold hover:text-green-300"
                : "text-gray-600 font-semibold text-xl hover:text-black hover:dark:text-slate-50"
            }`
          }
        >
          About Us
        </NavLink>
        <NavLink
          to={"/gallery"}
          className={({ isActive }) =>
            `flex p-2 items-center gap-4 hover:outline-none cursor-pointer ${
              isActive
                ? "text-green-500 text-xl font-semibold hover:text-green-300"
                : "text-gray-600 font-semibold text-xl hover:text-black hover:dark:text-slate-50"
            }`
          }
        >
          Gallery
        </NavLink>
        <NavLink
          to={"/contact-us"}
          className={({ isActive }) =>
            `flex p-2 items-center gap-4 hover:outline-none cursor-pointer ${
              isActive
                ? "text-green-500 text-xl font-semibold hover:text-green-300"
                : "text-gray-600 font-semibold text-xl hover:text-black hover:dark:text-slate-50"
            }`
          }
        >
          Contact Us
        </NavLink>
      </div>
      <div className="flex items-center gap-4">
        <ModeToggle />
        <Avatar className="hover:cursor-pointer">
          <AvatarFallback>
            <LogIn onClick={() => [navigate("/admin/login")]} />
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

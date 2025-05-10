import { NavLink, useNavigate } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { LogIn, Menu, User, X } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  let handleLogout = () => {
    localStorage.removeItem("Authorization");
    navigate("/admin/login");
  };

  const navItems = [
    { to: "/admin/dashboard", label: "Dashboard" },
    { to: "/admin/staffs", label: "Staffs" },
    { to: "/admin/gallery", label: "Gallery" },
    { to: "/admin/notice", label: "Notice" },
  ];

  return (
    <nav className="p-4 w-full bg-white dark:bg-black shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h1 className="text-lg font-bold md:text-2xl">
          Shree Balmandir Secondary School
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 items-center">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex p-2 items-center gap-2 cursor-pointer font-semibold text-xl transition-colors duration-200 ` +
                (isActive
                  ? "text-green-500 hover:text-green-300"
                  : "text-gray-600 hover:text-black dark:text-slate-50 dark:hover:text-slate-500")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          <Popover>
            <PopoverTrigger>
              <Avatar className="hover:cursor-pointer">
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent>
              <button
                className="border px-4 py-2 rounded-lg bg-red-500 text-white cursor-pointer w-full"
                onClick={handleLogout}
              >
                Logout
              </button>
            </PopoverContent>
          </Popover>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {menuOpen && (
        <div className="md:hidden mt-2 bg-white dark:bg-black shadow-inner">
          <div className="flex flex-col gap-2 p-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-2 px-3 rounded transition-colors duration-200 ` +
                  (isActive
                    ? "bg-green-100 text-green-500"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800")
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <ModeToggle />
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/admin/login");
                }}
                className="mt-2 flex items-center gap-2 font-semibold text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
              >
                <LogIn />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
